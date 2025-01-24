import Navbar from "@/components/navbar";
import { getProductBySlug } from "@/db/models/product";

const ProductPage = async ({ params }: { params: { slug: string } }) => {
  const slug = params?.slug;

  const formatRupiah = (price: number) => {
    return price.toLocaleString("id-ID");
  };

  if (!slug) {
    throw new Error("Slug not found");
  }

  const product = await getProductBySlug(slug);

  if (!product) {
    throw new Error("Product not found");
  }

  return (
    <>
      <Navbar />

      {/* Atas Section - Top Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="lg:flex space-x-8">
            <div className="lg:w-1/2 w-full justify-center mb-8 lg:mb-0">
              {/* Main Image */}
              <img
                src={product.thumbnail}
                alt={product.name}
                className="w-full h-auto max-w-[600px] object-cover rounded-lg shadow-lg"
              />
              {/* Thumbnail Images */}
              <div className="grid grid-cols-5 gap-2 mt-4">
                {product.images.map((image, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={image}
                      alt={`Image ${idx + 1}`}
                      className="w-full h-auto object-cover rounded-md cursor-pointer hover:opacity-75 transition-all"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <h1 className="text-3xl font-semibold text-gray-900">
                {product.name}
              </h1>
              <div className="py-4">
                <label className="text-blue-500">⭐⭐⭐⭐⭐ 5 Penilaian</label>
              </div>
              <p className="text-lg text-gray-600 mt-2">{product.excerpt}</p>
              {/* Tags */}
              <div className="mt-4">
                <span className="text-sm text-gray-600 font-semibold">
                  Tags:{" "}
                </span>
                {product.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-200 text-gray-800 py-1 px-3 rounded-full text-sm mr-2 mb-2 inline-block"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-2xl font-bold text-red-600">
                Rp. {formatRupiah(product.price)}
              </p>
              <div>
                <form className="max-w-xs">
                  <div className="py-5">
                    <label
                      htmlFor="bedrooms-input"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Kuantitas:
                    </label>
                    <input
                      type="number"
                      defaultValue={1}
                      className="bg-gray-300"
                    />
                  </div>
                </form>
              </div>
                <button className="mt-6 px-6 py-3 mr-2 bg-yellow-400 text-white rounded-lg shadow-md hover:bg-yellow-500 transition duration-300">
                  Beli sekarang
                </button>
                <button className="mt-6 px-6 py-3 ml-2 bg-orange-600 text-white rounded-lg shadow-md hover:bg-orange-700 transition duration-300">
                  Tambah ke troli
                </button>
              </div>
              <div>
              <button className="text-gray-500 group hover:text-red-500 focus:outline-none">
                  <svg
                    width="50px"
                    height="50px"
                    viewBox="0 0 1024 1024"
                    className="icon"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M 983.384 381.465 c 0 -147.456 -119.467 -266.923 -266.923 -266.923 c -81.4649 0 -154.283 36.4089 -203.207 93.8662 c -48.9245 -57.4578 -121.856 -93.8662 -203.207 -93.8662 c -147.456 0 -266.923 119.467 -266.923 266.923 c 0 77.3689 35.6125 142.109 85.5609 195.811 L 514.275 947.964 l 378.994 -366.592 c 48.0142 -50.0622 90.112 -120.377 90.112 -199.907 Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
      </section>

      {/* Bawah Section - Bottom Section with Full Description */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Product Description
          </h2>
          <p className="mt-4 text-lg text-gray-600">{product.description}</p>
          {/* You can add other sections here like creation date, etc. */}
          <div className="mt-6 text-sm text-gray-500">
            <p>
              Created At: {new Date(product.createdAt).toLocaleDateString()}
            </p>
            <p>
              Last Updated: {new Date(product.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductPage;
