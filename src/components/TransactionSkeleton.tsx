"use client";

export default function TransactionSkeleton() {
    return (
        <div
            className="flex justify-between items-center bg-stone-100 p-4 rounded-xl"
        >
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-stone-200 rounded-full" />
                <div>
                    <div className="h-3 w-24 bg-stone-200 rounded-md mb-2" />
                    <div className="h-3 w-36 bg-stone-200 rounded-md mb-2" />
                    <div className="h-3 w-16 bg-stone-200 rounded-md" />
                </div>
            </div>
            <div className="flex items-end justify-end flex-col">
                <div className="h-3 w-10 bg-stone-200 rounded-md mb-2" />
                <div className="h-3 w-20 bg-stone-200 rounded-md" />
            </div>
        </div>
    );
}
