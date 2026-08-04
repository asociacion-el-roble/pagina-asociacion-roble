import { useEffect, useState } from "react";

const baseUrl = import.meta.env.BASE_URL;

export function assetUrl(path: string) {
  if (!path) {
    return "";
  }

  if (/^(https?:|mailto:|tel:)/.test(path)) {
    return path;
  }

  return `${baseUrl}${path.replace(/^\/+/, "")}`;
}

export function useContent<T>(path: string, fallback: T) {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    const contentUrl = new URL(assetUrl(path), window.location.href);
    contentUrl.searchParams.set("v", Date.now().toString());

    fetch(contentUrl, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`No se pudo cargar ${path}`);
        }

        return response.json() as Promise<T>;
      })
      .then((content) => {
        if (active) {
          setData(content);
          setError(false);
        }
      })
      .catch(() => {
        if (active) {
          setError(true);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [path]);

  return { data, loading, error };
}
