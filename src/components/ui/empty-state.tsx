import { BoxIcon } from "lucide-react";


export function EmptyState() {
	return (
		<div className="flex flex-col items-center justify-center my-auto">
			<BoxIcon className="w-20 h-20 text-brand-500 dark:text-brand-400 max-md:hidden" />
			<p className="font-medium text-base text-foreground">Nothing here</p>
			<p className="text-muted-foreground text-sm">Try to find someone chat with you?</p>
		</div>
	);
}
