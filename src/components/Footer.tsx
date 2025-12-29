export default function Footer() {
    return (
        <footer className="bg-black py-16 px-6 border-t border-white/5">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-8 md:space-y-0">
                <div className="space-y-3">
                    <h3 className="text-xl font-bold tracking-widest">PROFILESHOTS</h3>
                    <p className="text-white/40 text-sm max-w-xs">
                        Between presence and memory, there is a photograph.
                    </p>
                </div>

                <div className="space-y-3">
                    <p className="text-white/40 text-xs font-medium uppercase tracking-[0.2em]">Contact</p>
                    <p className="text-sm">llprofileshotsll@gmail.com</p>
                    <p className="text-sm">+91 82075-97203</p>
                </div>

                <div className="text-white/20 text-xs">
                    &copy; {new Date().getFullYear()} Profileshots by Priyanshu Bandhu. <br />
                    All rights reserved.
                </div>
            </div>
        </footer>
    );
}
