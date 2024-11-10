import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <main className="h-screen flex items-center justify-center bg-gray-50 p-12">
      <div className="bg-white border border-gray-200 rounded-md p-12 flex-1 max-w-4xl text-center">
        <h1 className="mb-8">
          The page you are looking for could not be found 😢
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-blue-600 text-white rounded-md text-lg hover:bg-blue-700"
        >
          &larr; Go back
        </button>
      </div>
    </main>
  );
}

export default PageNotFound;
