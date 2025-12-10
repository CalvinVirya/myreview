import React from "react";
import { Map, Users, Star, Heart, TrendingUp, Award } from "react-feather";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Header />

      <div className="relative w-full h-[500px] flex items-center justify-center">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg')"
          }}
        >
          <div className="absolute inset-0 bg-serpentine/70 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-16">
          <span className="inline-block py-1 px-4 rounded-full bg-ivy/30 border border-spring/50 text-spring text-sm montserrat-medium mb-4 tracking-wider uppercase">
            #1 Review Platform in Indonesia
          </span>
          <h1 className="text-4xl md:text-6xl montserrat-bold text-first-frost mb-6 leading-tight">
            Find What’s Hidden <br />in Your City
          </h1>
          <p className="text-lg md:text-xl montserrat-regular text-spring/90 max-w-2xl mx-auto leading-relaxed">
            More than just reviews. We connect flavors, stories, and people through authentic local experiences.
          </p>
        </div>
      </div>

      <div className="relative z-20 -mt-10 px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border-t-4 border-ivy p-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-3xl montserrat-bold text-serpentine">10k+</h3>
            <p className="text-sm text-chrysler-cottonwood-gray mt-1 montserrat-medium">Active Users</p>
          </div>
          <div>
            <h3 className="text-3xl montserrat-bold text-serpentine">5k+</h3>
            <p className="text-sm text-chrysler-cottonwood-gray mt-1 montserrat-medium">Local Businesses</p>
          </div>
          <div>
            <h3 className="text-3xl montserrat-bold text-serpentine">50+</h3>
            <p className="text-sm text-chrysler-cottonwood-gray mt-1 montserrat-medium">Cities Covered</p>
          </div>
          <div>
            <h3 className="text-3xl montserrat-bold text-serpentine">4.8</h3>
            <p className="text-sm text-chrysler-cottonwood-gray mt-1 montserrat-medium">App Rating</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-24 space-y-24">

        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-spring/30 rounded-lg text-serpentine">
                <Map size={24} />
              </div>
              <span className="text-ivy montserrat-bold uppercase tracking-widest text-sm">Our Mission</span>
            </div>
            <h2 className="text-3xl md:text-4xl montserrat-bold text-serpentine leading-tight">
              Guiding Every Step Toward the <span className="text-ivy">Best Experiences</span>
            </h2>
            <p className="text-chrysler-cottonwood-gray montserrat-regular text-lg leading-relaxed text-justify">
              At MyReview, we believe the best recommendations come from real experiences, not just algorithms. Our mission is to empower communities across Indonesia by connecting people through authentic local stories, flavors, and places. With a trusted verification system and regularly updated business data, we ensure every review reflects genuine experiences—helping you discover the right spot, every time. Whether it’s a romantic dinner, urgent car service, or your morning coffee, MyReview guides your steps to the best local experiences.
            </p>
          </div>
          <div className="md:w-1/2 relative">
            <div className="absolute top-4 -right-4 w-full h-full bg-khaki-linen rounded-2xl"></div>
            <img
              src="https://images.pexels.com/photos/3411135/pexels-photo-3411135.jpeg"
              alt="People discussion"
              className="relative z-10 rounded-2xl shadow-lg w-full h-80 object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row-reverse items-center gap-12">
          <div className="md:w-1/2 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-spring/30 rounded-lg text-serpentine">
                <Users size={24} />
              </div>
              <span className="text-ivy montserrat-bold uppercase tracking-widest text-sm">Community</span>
            </div>
            <h2 className="text-3xl md:text-4xl montserrat-bold text-serpentine leading-tight">
              Growing Together with <span className="text-ivy">Local Businesses</span>
            </h2>
            <p className="text-chrysler-cottonwood-gray montserrat-regular text-lg leading-relaxed text-justify">
              Every review you write is real support for local business owners. We are building an ecosystem where small businesses can shine through the quality of their services, and users can help each other with honest and transparent information.
            </p>
          </div>
          <div className="md:w-1/2 relative">
            <div className="absolute top-4 -left-4 w-full h-full bg-spring rounded-2xl"></div>
            <img
              src="https://images.pexels.com/photos/3807799/pexels-photo-3807799.jpeg"
              alt="Community"
              className="relative z-10 rounded-2xl shadow-lg w-full h-80 object-cover"
            />
          </div>
        </div>

      </div>

      <div className="bg-first-frost py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl montserrat-bold text-serpentine mb-4">Why Choose Our Platform?</h2>
            <div className="w-20 h-1.5 bg-ivy mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-spring/20 rounded-full flex items-center justify-center text-ivy mb-6 group-hover:bg-ivy group-hover:text-white transition-colors">
                <Star size={28} />
              </div>
              <h3 className="text-xl montserrat-bold text-serpentine mb-3">Reviews You Can Trust</h3>
              <p className="text-chrysler-cottonwood-gray text-sm leading-relaxed">
                Our trusted verification system guarantees reviews are based on real experiences.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-spring/20 rounded-full flex items-center justify-center text-ivy mb-6 group-hover:bg-ivy group-hover:text-white transition-colors">
                <TrendingUp size={28} />
              </div>
              <h3 className="text-xl montserrat-bold text-serpentine mb-3">Stay Updated</h3>
              <p className="text-chrysler-cottonwood-gray text-sm leading-relaxed">
                Our system keeps business data fresh, so you only discover places that are open.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-spring/20 rounded-full flex items-center justify-center text-ivy mb-6 group-hover:bg-ivy group-hover:text-white transition-colors">
                <Heart size={28} />
              </div>
              <h3 className="text-xl montserrat-bold text-serpentine mb-3">Made with Love</h3>
              <p className="text-chrysler-cottonwood-gray text-sm leading-relaxed">
                Developed with passion to advance local communities across Indonesia.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-24 px-6 bg-white text-center">
        <div className="max-w-3xl mx-auto">
          <Award size={48} className="mx-auto text-ivy mb-6" />
          <h2 className="text-3xl md:text-4xl montserrat-bold text-serpentine mb-6">
            Ready to Dive In?
          </h2>
          <p className="text-chrysler-cottonwood-gray text-lg mb-8">
            Join thousands of users and start sharing your unique experiences today.
          </p>
          <button className="bg-serpentine hover:bg-ivy text-white py-3 px-8 rounded-full montserrat-semibold text-lg transition-colors shadow-lg hover:shadow-xl cursor-pointer">
            Start Your Journey Now
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;