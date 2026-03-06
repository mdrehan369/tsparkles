import { Button } from "./ui/button";

export default function Pagination({
  page,
  setPage,
  totalPages,
}: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}) {
  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
      >
        Previous
      </Button>

      <div className="flex items-center gap-1">
        {[...Array(Math.min(totalPages, 5))].map((_, i) => {
          const pageNumber = i + 1;
          return (
            <Button
              key={pageNumber}
              variant={page === pageNumber ? "default" : "outline"}
              size="sm"
              className="w-9"
              onClick={() => setPage(pageNumber)}
            >
              {pageNumber}
            </Button>
          );
        })}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => setPage((prev) => Math.min(prev + 1, 100))}
        disabled={page === totalPages}
      >
        Next
      </Button>
    </div>
  );
}
