
export function FormSkeleton() {
	return (
		<div className="mt-8 sm:max-auto sm:w-full sm:max-w-md animate-pulse">
			<div className="bg-gray-200 px-4 py-8 shadow sm:rounded-lg sm:px-10">
				<form className="space-y-6">
					<div className="h-6 bg-gray-300 rounded"></div>
					<div className="h-6 bg-gray-300 rounded"></div>
					<div className="h-6 bg-gray-300 rounded"></div>
					<div className="h-10 bg-gray-300 rounded"></div>
				</form>
				<div className="mt-6">
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-300"></div>
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="px-2 bg-gray-200 text-gray-500"></span>
						</div>
					</div>
				</div>
				<div className="mt-6 flex gap-2">
					<div className="h-10 bg-gray-300 rounded w-full"></div>
					<div className="h-10 bg-gray-300 rounded w-full"></div>
				</div>
				<div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500 ">
					<div className="h-6 bg-gray-300 rounded"></div>
				</div>
			</div>
		</div>
	);
}
