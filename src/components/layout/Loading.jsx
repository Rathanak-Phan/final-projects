import { FaSpinner } from "react-icons/fa";

export default function Loading({ message = "Loading products..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-slate-600">
      <FaSpinner className="animate-spin text-4xl text-blue-600 mb-3" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}