import FeaturedCard from "@/components/FeaturedCard";
import HomeMore from "@/components/HomeMore";
import Navbar from "@/components/navbar";
import { getProducts } from "@/db/models/product";

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
};

const fetchProducts = async () => {
  const response = await fetch("http://localhost:3000/api/products");
  const responseJson: Product[] = await response.json();

  if (!response.ok) {
    throw new Error("Response is not ok");
  }

  return responseJson;
};

const HomePage = async () => {
  const products = await getProducts();
  const featured = products.slice(0, 5);
  return (
    <>
      <Navbar />
      <div className="w-screen flex h-full items-center px-20">
        <div className="w-10/12">
          <img src="https://img.lazcdn.com/g/tps/imgextra/i4/O1CN01zGM6Sl1VO5R0r71Qa_!!6000000002642-0-tps-1976-688.jpg_2200x2200q80.jpg_.avif"></img>
        </div>
        <div className="w-2/12 bg-transparent">
          <img src="https://ik.imagekit.io/matguchi18/P3-GC02/1.png"></img>
        </div>
      </div>
      <div className="w-screen h-48 px-20 grid grid-cols-3 p-5 gap-2">
        <div className="bg-white border-b border-black">
          <img src="https://ik.imagekit.io/matguchi18/P3-GC02/2.png"></img>
        </div>
        <div className="bg-white border-b border-black">
          <img src="https://ik.imagekit.io/matguchi18/P3-GC02/3(1).png"></img>
        </div>
        <div className="bg-white border-b border-black">
          <img src="https://ik.imagekit.io/matguchi18/P3-GC02/4.png"></img>
        </div>
      </div>
      {/* tambahin disini */}
      <HomeMore />
      <div className="px-20 w-screen justify-center">
        <FeaturedCard products={JSON.stringify(featured)} />
      </div>
      <footer className="w-full bg-gray-200 text-gray-600 py-8">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="font-bold my-5 text-justify">
                Nyaman Belanja Online
              </div>
              <div className="text-justify">
                <label>
                  Lazada adalah perintis e-commerce (online shopping) di
                  beberapa negara dengan pertumbuhan tercepat di dunia yang
                  menawarkan pengalaman belanja online cepat, aman dan nyaman.
                  Lazada selalu hadir dengan pelayanan terbaik dengan metode
                  pembayaran yang lengkap dan aman, jaminan pengembalian barang,
                  layanan konsumen 24 jam dan promo-promo terbaik seperti gratis
                  ongkir, cashback, voucher diskon dan pastinya diskon untuk
                  konsumen. Sebagai salah satu aplikasi belanja online terbaik
                  di Indonesia, Lazada menyediakan jutaan produk yang selalu
                  update setiap saat langsung di genggaman tangan.
                </label>
              </div>
              <div className="my-5 text-justify font-bold">
                Terpercaya Se-Asia Tenggara
              </div>
              <div className="text-justify">
                <label>
                  Setiap hari adalah hari belanja di Lazada. Lebih dari sekedar
                  e-commerce di Indonesia, Lazada turut menciptakan pengalaman
                  belanja online terbaik untuk setiap pelanggan di Indonesia
                  bahkan Asia Tenggara. Selain menyediakan pengalaman belanja
                  online yang lengkap dan mudah bagi konsumen, Lazada juga
                  memastikan kepuasan seller untuk berjualan online dengan
                  berbagai dukungan maksimal. Sehingga hubungan antara pelanggan
                  dan penjual menciptakan rasa saling percaya dalam budaya jual
                  beli online terbaik di Indonesia.
                </label>
              </div>
              <div className="my-5 text-justify font-bold">
                Promo Belanja Online Terbaik
              </div>
              <div className="mt-5 text-justify">
                <label>
                  Belanja akan terasa lebih hemat dari sebelumnya dengan
                  penawaran ekslusif di Lazada. Mulai dari voucher potongan
                  harga, diskon spesial yang update tiap hari, juga update dari
                  promo terbaru dari brand terbaik dalam dan luar negeri. Khusus
                  pengguna baru yang belum pernah belanja di Lazada, kamu akan
                  langsung mendapatkan gratis ongkir dan juga voucher diskon
                  tambahan ditambah lagi hadiah langsung setelah download
                  aplikasi Lazada.
                </label>
              </div>
              <div className="mt-5">
                <label className="font-bold">
                  LazMall 100% Original dan Lengkap
                </label>
              </div>
            </div>
            <div>
              <div className="font-bold my-5 text-justify">
                Belanja Sesuai Keinginanmu
              </div>
              <div className="text-justify">
                <label>
                  Selain mudah dan nyaman belanja online kini bisa sesuai dengan
                  keinginanmu, mulai dari koleksi produk, kategori dan brand
                  resmi yang kamu suka, hadir langsung di halaman depan
                  aplikasi. Kemudahan berbelanja produk-produk terkenal dunia
                  semua ada di LazMall, mulai dari Wardah, Adidas, L’Oreal,
                  Herschel, The Body Shop, Pampers dan banyak lagi brand populer
                  lainnya. Temukan semua brand favoritmu di LazMall, 100%
                  original dengan 15 hari pengembalian dan 1 hari pengiriman.
                  Semua lengkap ada di Lazada mulai dari produk elektronik,
                  furnitur, olahraga, kesehatan, kecantikan, kosmetik, tas,
                  fashion, hijab, kebutuhan ibu dan anak, sepatu, pulsa,
                  perlengkapan automotif, kebutuhan hewan peliharaan, susu dan
                  masih banyak lagi.
                </label>
              </div>
              <div className="font-bold my-5 text-justify">
                Review Asli, Pembayaran Aman Terpercaya!
              </div>
              <div className="text-justify">
                <label>
                  Lazada juga menampilkan review produk dari konsumen asli,
                  rating seller dan fitur chat langsung dengan seller. Kamu gak
                  perlu khawatir, karena metode pembayaran bisa dan dijamin
                  aman! Termasuk pembayaran favorit kamu seperti COD (bayar di
                  tempat). Mau bayar pakai Lazada Credit, bank transfer, kartu
                  kredit, pembayaran di minimarket dan aplikasi cicilan online
                  populer lainnya bisa di Lazada.
                </label>
              </div>
              <div className="font-bold my-5 text-justify">
                Pilihan Produk Terlengkap Banyak Kategori di Lazada 12.12
              </div>
              <div className="text-justify">
                <label>
                  Temukan segala kebutuhanmu di Lazada dengan mudah yang telah
                  tersedia dari berbagai kategori terpopuler yang banyak dicari.
                  Khusus pengguna baru kamu juga bisa menikmati voucher diskon
                  tambahan untuk pembelian pertamamu dan gratis ongkir, jadi
                  tunggu apa lagi yuk buruan cari dan borong semua produknya
                  sekarang juga di Lazada 12.12 Sale ada bonus 10RB tiap belanja
                  80RB, gratis ongkir tanpa minimum pembelian dan cashback 20%
                  hingga 450RB!
                </label>
              </div>
            </div>
            <div>
              <div className="font-bold my-5 text-justify">
                TOP CATEGORIES & BRANDS
              </div>
              <div className="text-justify">
                <label>
                  <strong>AUTOMOTIVE & GADGETS</strong>
                  <br />
                  Yamaha, OEM, Honda, Vespa, Axio, Kyoto, Pioneer, Kawasaki,
                  Toyota, more..
                </label>
                <br />
                <label>
                  <strong>BABY & TODDLER</strong>
                  <br />
                  MamyPoko, Merries, PAMPERS, Wyeth S26, Bebelac, Popok, Susu
                  Formula, Enfagrow, more...
                </label>
                <br />
                <label>
                  <strong>CAMERAS</strong>
                  <br />
                  Xiaomi, Kogan, Nikon, Canon, Samsung, Fujifilm, Olympus,
                  GoPro, more...
                </label>
                <br />
                <label>
                  <strong>COMPUTERS & LAPTOPS</strong>
                  <br />
                  ASUS, Lenovo, HP, WD, Acer, Apple, Logitech, Intel, Gaming PC,
                  more...
                </label>
                <br />
                <label>
                  <strong>FASHION</strong>
                  <br />
                  OEM, levi's, Macbeth, Zada, Alibi Paris, Converse, Puma,
                  Fossil, New Balance, more...
                </label>
                <br />
                <label>
                  <strong>GROCERIES</strong>
                  <br />
                  Zippo, Ovomaltine, Jelly Belly, Ohome, Naraya, Snack Import,
                  Indomie, Samyang, more...
                </label>
                <br />
                <label>
                  <strong>HEALTH & BEAUTY</strong>
                  <br />
                  SK-II, Moment, Herbalife, Dermawand, Philips, L'Oreal, NYX,
                  Maybelline, Nivea, more...
                </label>
                <br />
                <label>
                  <strong>HOME & LIVING</strong>
                  <br />
                  Vicenza, OEM, Oxone, Calista, AIUEO, BOSCH, Terry Palmer,
                  Maxim, more...
                </label>
                <br />
                <label>
                  Belanja di seluruh dunia dengan AliExpress
                  <br />
                  Russia, Spain, France, Germany, Poland, Brazil, Saudi Arabia
                </label>
                <br />
                <label>
                  Belanja di seluruh dunia dengan Daraz
                  <br />
                  Pakistan, Bangladesh, Sri Lanka, Myanmar, Nepal
                </label>
              </div>
            </div>
            <div>
              <div className="font-bold my-5 text-justify">
                MEDIA, MUSIC & BOOKS
              </div>
              <div className="text-justify">
                <label>
                  Yamaha , OEM , Digital Al-Quran , Nektar , Casio , Sony Music
                  , Universal Music , more...
                </label>
                <br />
                <label>
                  <strong>MOBILES & TABLETS</strong>
                  <br />
                  Samsung , Xiaomi , Infinix , Lenovo , ASUS , Apple , HTC ,
                  Blackberry , Sony , Oppo , Apple iPhone 7 , more...
                </label>
                <br />
                <label>
                  <strong>SPORTS & OUTDOORS</strong>
                  <br />
                  OEM , Nike , Adidas , BFIT , Reebok , Coleman , Puma , more...
                </label>
                <br />
                <label>
                  <strong>TOYS & GAMES</strong>
                  <br />
                  LEGO , OEM , Syma , Tomindo , Bandai , Hot Wheels , Tomica ,
                  Pokemon , more...
                </label>
                <br />
                <label>
                  <strong>TRAVEL & LUGGAGE</strong>
                  <br />
                  Polo Team , Navy Club , Onlan , OEM , BGC , Herschel ,
                  American Tourister , more...
                </label>
                <br />
                <label>
                  <strong>TV, AUDIO / VIDEO, GAMING, GADGETS</strong>
                  <br />
                  Samsung , Sony , LG , Xiaomi , I-one , Panduan Membeli TV ,
                  more...
                </label>
                <br />
                <label>
                  <strong>VOUCHERS AND SERVICES</strong>
                  <br />
                  Isi Ulang Pulsa , Indosat , PLN , Telkomsel , Apple , XL ,
                  more...
                </label>
                <br />
                <label>
                  <strong>WATCHES SUNGLASSES JEWELLERY</strong>
                  <br />
                  Swiss Army , Casio , OEM , Blue lans , Alexandre Christie ,
                  more...
                </label>
                <br />
                <label>
                  <strong>HOME APPLIANCES</strong>
                  <br />
                  Philips , Sharp , Panasonic , Miyako , Samsung , LG , Nescafe
                  , Cosmos , more...
                </label>
                <br />
                <label>
                  <strong>PROMO SPESIAL</strong>
                  <br />
                  #BelanjaDariRumah Kebutuhan Kesehatan & Harian
                </label>
              </div>
            </div>
          </div>

          <div></div>
        </div>
      </footer>
    </>
  );
};

export default HomePage;
