
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className="max-w-md mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 border-l-4 border-green-500">
            <p className="text-lg mb-2 text-gray-600">“Peace comes from within.  Do not seek it without.”</p>
            <p className="text-sm text-gray-600">- Buddha</p>
        </div>
        
        <form className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-600">Share Your Wisdom</h2>
            <div className="mb-4">
                <input type="text" placeholder="Your Name" required
                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"/>
            </div>
            <div className="mb-4">
                <textarea placeholder="Your Wisdom" required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 h-24"></textarea>
            </div>
            <button type="submit"
                    className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300">
                Submit
            </button>
        </form>
    </div>
    </main>
  );
}
