"use client";

const Stats = () => {
  return (
    <section className="py-20 px-4 bg-black/30">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <h3 className="text-4xl font-bold gradient-text">10k+</h3>
            <p className="text-gray-400 mt-2">Active Users</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold gradient-text">1M+</h3>
            <p className="text-gray-400 mt-2">Lines of Code</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold gradient-text">50k+</h3>
            <p className="text-gray-400 mt-2">Collaborations</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold gradient-text">99.9%</h3>
            <p className="text-gray-400 mt-2">Uptime</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats; 