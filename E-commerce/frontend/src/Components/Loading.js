export default function Loading() {
    return (
        <div className={"min-h-screen sticky top-0 bg-white flex justify-center items-center"}>
            <div className="flex justify-center items-center h-screen">
                <div className="relative inline-flex">
                    <div className="w-24 h-24 bg-[#f553c7] rounded-full"></div>
                    <div className="w-24 h-24 bg-[#f553c7] rounded-full absolute top-0 left-0 animate-ping"></div>
                    <div className="w-24 h-24 bg-[#f553c7] rounded-full absolute top-0 left-0 animate-pulse"></div>
                </div>
            </div>
        </div>
    )
}