import React from "react";

const Assistant = () => {
	return (
		<section className="border border-gray-300 rounded-md p-5">
			<div>
				<h1 className="text-2xl font-semibold">Chat with Apomuden Assistant</h1>
				<p className="text-gray-500 text-sm">
					Describe your symptoms or ask questions about your health
				</p>
			</div>

			<div className="ring-1 ring-gray-200 ring-opacitiy-5 rounded-md mt-5 p-4">
				<div>
					<p className="w-10 h-10 bg-gray-200 rounded-full flex justify-center items-center">AC</p>

					<div>
            <p className="bg-[#f4f4f5] text-zinc-700">I am Apomuden Assistant. How can i help you today ?</p>
          </div>
				</div>
			</div>
		</section>
	);
};

export default Assistant;
