import { Octokit } from "@octokit/rest";
import type { Product } from "@prisma/client";

type RepoProduct = Pick<Product, "repoOwner" | "repoName" | "repoUrl" | "name">;

function getOctokit() {
  const token = process.env.GITHUB_SELLER_PAT;

  if (!token) {
    throw new Error("GITHUB_SELLER_PAT is not configured.");
  }

  return new Octokit({ auth: token });
}

function errorStatus(error: unknown) {
  if (typeof error === "object" && error && "status" in error) {
    return Number((error as { status?: number }).status);
  }

  return undefined;
}

async function retry<T>(operation: () => Promise<T>, attempts = 3) {
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      if (attempt === attempts) {
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, attempt * 750));
    }
  }

  throw lastError;
}

export async function addReadOnlyCollaborator(
  product: RepoProduct,
  username: string
) {
  if (!username) {
    throw new Error("Buyer GitHub username is missing.");
  }

  return retry(async () => {
    const octokit = getOctokit();

    try {
      await octokit.repos.checkCollaborator({
        owner: product.repoOwner,
        repo: product.repoName,
        username
      });

      return {
        status: "already-has-access" as const,
        repo: product.repoUrl
      };
    } catch (error) {
      if (errorStatus(error) !== 404) {
        throw error;
      }
    }

    const response = await octokit.repos.addCollaborator({
      owner: product.repoOwner,
      repo: product.repoName,
      username,
      permission: "pull"
    });

    return {
      status: response.status === 201 ? "invite-sent" : "access-confirmed",
      repo: product.repoUrl
    };
  });
}

export async function removeCollaborator(product: RepoProduct, username: string) {
  if (!username) {
    return;
  }

  await retry(async () => {
    const octokit = getOctokit();

    await octokit.repos.removeCollaborator({
      owner: product.repoOwner,
      repo: product.repoName,
      username
    });
  });
}
