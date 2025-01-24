"use client";

import { useSearchParams } from "next/navigation";

const ErrorComponent = () => {
	const searchParams = useSearchParams();
	const errorMessage = searchParams.get("error");

	return (
		<>
			{errorMessage && (
				<p className="w-auto h-auto p-2 rounded-lg bg-red-500 text-white">
					{errorMessage}
				</p>
			)}
		</>
	);
};

export default ErrorComponent