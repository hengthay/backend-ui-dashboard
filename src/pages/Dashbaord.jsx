import Grid from './Grid';


const Dashboard = () => {
  return (
    <div className="space-y-6 mt-23 md:ml-65 shadow-md bg-white min-h-screen md:w-[1425px] w-[650px] max-sm:max-w-[500px] mx-3 p-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>

      {/* Example Cards */}
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Total Products</h3>
            <p className="text-3xl font-bold mt-2">128</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
            <p className="text-3xl font-bold mt-2">452</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Total Sales</h3>
            <p className="text-3xl font-bold mt-2">$2,340</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">New Orders</h3>
            <p className="text-3xl font-bold mt-2">32</p>
          </div>
        </div>
        <Grid />
      </div>
    </div>
  );
};

export default Dashboard;
