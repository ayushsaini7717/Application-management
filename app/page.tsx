import BrowseBtn from "./custom-components/BrowseBtn";
import '../styles/gradientAnimation.css';
import '../styles/underlineGradient.css';

export default function Home() {
  return (
    <>
      <div className=" h-screen">
        <div className="bg-gray-50">
          <div className="gradient-animated pb-20">
            <div className="flex flex-col items-center text-center pt-10 px-4">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white">
                Find Your Dream Job Today
              </h1>
              <h3 className="text-lg md:text-xl lg:text-2xl font-medium max-w-2xl mt-2 text-white">
                Join our team of passionate professionals and build your career with us. We offer
                exciting opportunities across various fields.
              </h3>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-10">
              <BrowseBtn/>
              {/* <button className="border cursor-pointer hover:bg-black/5 bg-red-500 text-white border-gray-400 rounded px-4 py-2 font-semibold">
                Learn About Us
              </button> */}
            </div>

          </div>

          <div className="mt-20 text-center flex flex-col">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Why Join Our Team?</h2>
            <div className="rootUnderline ml-7 w-[100px] self-center h-1 rounded"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-8 md:px-12 lg:px-16 mt-12 pb-20">
            <div className="flex flex-col items-center gap-2">
              <div className="p-4 bg-black/10 rounded-full w-fit svgBackground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-10 w-10 text-primary"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                  <path d="M2 12h20"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Remote-Friendly</h3>
              <p className="text-gray-500 text-center max-w-xs">
                Work from anywhere in the world. We believe in flexibility and trust our team to
                deliver excellence.
              </p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="p-4 bg-black/10 rounded-full w-fit svgBackground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-10 w-10 text-primary"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Collaborative Culture</h3>
              <p className="text-gray-500 text-center max-w-xs">
                Join a supportive team that values collaboration, innovation, and personal growth.
              </p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="p-4 bg-black/10 rounded-full w-fit svgBackground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-10 w-10 text-primary"
                >
                  <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
                  <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
                  <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
                  <path d="M10 6h4"></path>
                  <path d="M10 10h4"></path>
                  <path d="M10 14h4"></path>
                  <path d="M10 18h4"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Career Growth</h3>
              <p className="text-gray-500 text-center max-w-xs">
                We invest in our employees' development with mentorship, training, and advancement
                opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
