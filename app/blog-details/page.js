import AkpagerLayout from "@/layouts/AkpagerLayout";
import Link from "next/link";
const page = () => {
  return (
    <AkpagerLayout>
      <section
        className="hero-padding bg-bg-primary relative z-1 bgs-cover text-center"
        style={{ backgroundImage: "url(assets/images/backgrounds/banner.jpg)" }}
      >
        <div className="container mx-auto px-4">
          <div className="relative">
            <h2
              className="hero-heading text-white mb-6"
              data-aos="fade-up"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              Achieving Fashion Elegant Design Runway Life
            </h2>
            <ul
              className="flex items-center justify-center gap-6 text-white/90"
              data-aos="fade-up"
              data-aos-delay={50}
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <li>
                <a className="text-yellow-light hover:text-yellow-dark transition-all duration-300" href="#">
                  SEO Camping
                </a>
              </li>
              <li>
                <img src="assets/images/blog/author.png" alt="Author" />{" "}
                <a href="#">Matthew</a>
              </li>
              <li>
                <i className="far fa-calendar-alt" />{" "}
                <a href="#">September 20, 2023</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="section-padding bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="px-4 lg:w-2/3">
              <div>
                <div>
                  <div
                    className="rounded-xl overflow-hidden mb-8"
                    data-aos="fade-up"
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    <img
                      src="assets/images/blog/blog-standard1.png"
                      alt="Blog"
                    />
                  </div>
                  <h3 className="section-heading text-white mb-6">Elegant Design Runway to Real Life</h3>
                  <p className="body-text text-white/90 mb-6">
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo. Nemo
                    enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                    aut fugit, sed quia consequuntur magni dolores eos qui
                    ratione voluptatem sequi nesciunt. Neque porro quisquam est,
                    qui dolorem ipsum quia dolor sit amet <br />
                    consectetur, adipisci velit, sed quia non numquam eius modi
                    tempora incidunt ut labore et dolore magnam aliquam quaerat
                    voluptatem. Ut enim ad minima veniam, quis nostrum
                    exercitationem ullam corporis suscipit laboriosam, nisi ut
                    aliquid ex ea commodi consequatur? Quis autem vel eum iure
                    reprehenderit qui in ea voluptate velit esse quam nihil
                    molestiae consequatur, vel illum qui dolorem eum fugiat quo
                    voluptas nulla pariatur
                  </p>
                  <h3 className="section-heading text-white mb-6">Get Your Service to Improve Business</h3>
                  <p className="body-text text-white/90 mb-8">
                    Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                    amet, consectetur, adipisci velit, sed quia non numquam eius
                    modi tempora incidunt ut labore et dolore magnam aliquam
                    quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
                    exercitationem ullam
                  </p>
                  <div className="flex flex-wrap justify-between items-center py-6 border-t border-b border-border-light">
                    <div
                      className="flex items-center gap-3"
                      data-aos="fade-left"
                      data-aos-duration={1500}
                      data-aos-offset={50}
                    >
                      <b className="text-white mr-3">Tags </b>
                      <div className="flex gap-2">
                        <Link href="blog" className="px-4 py-2 bg-blue-darkest/30 backdrop-blur-sm border border-blue-middle/20 rounded-lg text-text-light hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">Marketing</Link>
                        <Link href="blog" className="px-4 py-2 bg-blue-darkest/30 backdrop-blur-sm border border-blue-middle/20 rounded-lg text-text-light hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">Product</Link>
                        <Link href="blog" className="px-4 py-2 bg-blue-darkest/30 backdrop-blur-sm border border-blue-middle/20 rounded-lg text-text-light hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">Social Media</Link>
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-3"
                      data-aos="fade-right"
                      data-aos-duration={1500}
                      data-aos-offset={50}
                    >
                      <b className="text-white mr-3">Share </b>
                      <div className="flex gap-3">
                        <a href="#" className="w-10 h-10 bg-blue-middle/20 rounded-lg flex items-center justify-center hover:bg-yellow-light/20 transition-all duration-300">
                          <i className="fab fa-facebook-f text-blue-middle hover:text-yellow-light" />
                        </a>
                        <a href="#" className="w-10 h-10 bg-blue-middle/20 rounded-lg flex items-center justify-center hover:bg-yellow-light/20 transition-all duration-300">
                          <i className="fab fa-twitter text-blue-middle hover:text-yellow-light" />
                        </a>
                        <a href="#" className="w-10 h-10 bg-blue-middle/20 rounded-lg flex items-center justify-center hover:bg-yellow-light/20 transition-all duration-300">
                          <i className="fab fa-linkedin-in text-blue-middle hover:text-yellow-light" />
                        </a>
                        <a href="#" className="w-10 h-10 bg-blue-middle/20 rounded-lg flex items-center justify-center hover:bg-yellow-light/20 transition-all duration-300">
                          <i className="fab fa-instagram text-blue-middle hover:text-yellow-light" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 mt-8"
                  data-aos="fade-up"
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  <div className="flex gap-6">
                    <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src="assets/images/blog/admin-author.jpg"
                        alt="Author"
                      />
                    </div>
                    <div className="flex-1">
                      <h5 className="card-heading text-white mb-3">Richard M. Fudge</h5>
                      <p className="body-text text-white/90 mb-4">
                        We denounce with righteous indignation and dislike men
                        ways to beguiled demoralized by the charms of pleasure
                      </p>
                      <div className="flex gap-3">
                        <Link href="contact" className="w-10 h-10 bg-blue-middle/20 rounded-lg flex items-center justify-center hover:bg-yellow-light/20 transition-all duration-300">
                          <i className="fab fa-facebook-f text-blue-middle hover:text-yellow-light" />
                        </Link>
                        <Link href="contact" className="w-10 h-10 bg-blue-middle/20 rounded-lg flex items-center justify-center hover:bg-yellow-light/20 transition-all duration-300">
                          <i className="fab fa-twitter text-blue-middle hover:text-yellow-light" />
                        </Link>
                        <Link href="contact" className="w-10 h-10 bg-blue-middle/20 rounded-lg flex items-center justify-center hover:bg-yellow-light/20 transition-all duration-300">
                          <i className="fab fa-linkedin-in text-blue-middle hover:text-yellow-light" />
                        </Link>
                        <Link href="contact" className="w-10 h-10 bg-blue-middle/20 rounded-lg flex items-center justify-center hover:bg-yellow-light/20 transition-all duration-300">
                          <i className="fab fa-instagram text-blue-middle hover:text-yellow-light" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                  <div
                    className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-xl p-4 flex gap-4 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300"
                    data-aos="fade-left"
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img src="assets/images/widget/news4.jpg" alt="News" />
                    </div>
                    <div className="flex-1">
                      <span className="small-text text-white/90">September 20, 2023</span>
                      <h6 className="mt-1">
                        <Link href="blog-details">
                          <span className="text-white hover:text-yellow-light transition-all duration-300">Achieving Fashion Elegant se Runway to Real Life</span>
                        </Link>
                      </h6>
                    </div>
                  </div>
                  <div
                    className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-xl p-4 flex gap-4 hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300"
                    data-aos="fade-right"
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img src="assets/images/widget/news5.jpg" alt="News" />
                    </div>
                    <div className="flex-1">
                      <span className="small-text text-white/90">September 20, 2023</span>
                      <h6 className="mt-1">
                        <Link href="blog-details">
                          <span className="text-white hover:text-yellow-light transition-all duration-300">Achieving Fashion Elegant se Runway to Real Life</span>
                        </Link>
                      </h6>
                    </div>
                  </div>
                </div>
                <h4 className="section-heading text-white mb-6">Comments</h4>
                <div className="space-y-6">
                  <div
                    className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-xl p-6 flex gap-4"
                    data-aos="fade-up"
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src="assets/images/blog/comment-author1.png"
                        alt="Author"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h6 className="card-heading text-white">William L. Jackson</h6>
                        <span className="small-text text-white/90">Sep 25, 2023</span>
                      </div>
                      <p className="body-text text-white/90 mb-3">
                        Quis autem vel eum iure reprehenderit qui in ea
                        voluptate velit esse molestiae consequatur qui dolorem
                        eum fugiat voluptas
                      </p>
                      <a className="text-blue-middle hover:text-yellow-light transition-all duration-300 flex items-center gap-2" href="#">
                        Reply <i className="far fa-arrow-right" />
                      </a>
                    </div>
                  </div>
                  <div
                    className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-xl p-6 flex gap-4 ml-12"
                    data-aos="fade-up"
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src="assets/images/blog/comment-author2.png"
                        alt="Author"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h6 className="card-heading text-white">James M. Stovall</h6>
                        <span className="small-text text-white/90">February 25, 2024</span>
                      </div>
                      <p className="body-text text-white/90 mb-3">
                        Quis autem vel eum iure reprehenderit qui in ea
                        voluptate velit esse molestiae consequatur qui dolorem
                        eum fugiat voluptas
                      </p>
                      <a className="text-blue-middle hover:text-yellow-light transition-all duration-300 flex items-center gap-2" href="#">
                        Reply <i className="far fa-arrow-right" />
                      </a>
                    </div>
                  </div>
                </div>
                <form
                  id="comment-form"
                  className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 mt-8"
                  data-aos="fade-up"
                  data-aos-duration={1500}
                  data-aos-offset={50}
                  name="comment-form"
                  action="#"
                  method="post"
                >
                  <h4 className="section-heading text-white mb-6">Leave a Reply</h4>
                  <div className="flex flex-wrap -mx-4">
                    <div className="px-4 md:w-1/2">
                      <div className="mb-4">
                        <input
                          type="text"
                          id="full-name"
                          name="full-name"
                          className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm border border-blue-middle/50 rounded-lg placeholder-text-muted text-white focus:outline-none focus:ring-2 focus:ring-blue-middle focus:border-blue-middle transition-all duration-300"
                          defaultValue=""
                          placeholder="Full Name"
                          required=""
                        />
                      </div>
                    </div>
                    <div className="px-4 md:w-1/2">
                      <div className="mb-4">
                        <input
                          type="text"
                          id="blog-phone"
                          name="blog-phone"
                          className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm border border-blue-middle/50 rounded-lg placeholder-text-muted text-white focus:outline-none focus:ring-2 focus:ring-blue-middle focus:border-blue-middle transition-all duration-300"
                          defaultValue=""
                          placeholder="Phone"
                          required=""
                        />
                      </div>
                    </div>
                    <div className="px-4 md:w-full">
                      <div className="mb-4">
                        <input
                          type="email"
                          id="blog-email"
                          name="blog-email"
                          className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm border border-blue-middle/50 rounded-lg placeholder-text-muted text-white focus:outline-none focus:ring-2 focus:ring-blue-middle focus:border-blue-middle transition-all duration-300"
                          defaultValue=""
                          placeholder="Email Address"
                          required=""
                        />
                      </div>
                    </div>
                    <div className="px-4 md:w-full">
                      <div className="mb-4">
                        <textarea
                          name="message"
                          id="message"
                          className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm border border-blue-middle/50 rounded-lg placeholder-text-muted text-white focus:outline-none focus:ring-2 focus:ring-blue-middle focus:border-blue-middle transition-all duration-300"
                          rows={4}
                          placeholder="Comments"
                          required=""
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    <div className="px-4 md:w-full">
                      <div className="mb-4">
                        <button type="submit" className="px-8 py-4 bg-blue-darkest hover:bg-blue-middle text-white rounded-lg font-medium transition-all duration-300 flex items-center gap-2">
                          Send Comments <i className="far fa-arrow-right" />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="px-4 lg:w-1/3">
              <div className="space-y-8">
                <div
                  className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8"
                  data-aos="fade-up"
                  data-aos-delay={50}
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  <h5 className="card-heading text-white mb-4">Search</h5>
                  <form action="#" className="relative">
                    <input type="text" placeholder="Keywords" required="" className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm border border-blue-middle/50 rounded-lg placeholder-text-muted text-white focus:outline-none focus:ring-2 focus:ring-blue-middle focus:border-blue-middle transition-all duration-300 pr-12" />
                    <button
                      type="submit"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-middle hover:text-yellow-light transition-all duration-300"
                    >
                      <i className="far fa-search" />
                    </button>
                  </form>
                </div>
                <div
                  className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8"
                  data-aos="fade-up"
                  data-aos-delay={50}
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  <h5 className="card-heading text-white mb-6">Category</h5>
                  <ul className="space-y-3">
                    <li>
                      <Link href="blog" className="flex items-center justify-between p-3 bg-white/5 backdrop-blur-sm border border-border-light rounded-lg hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group">
                        <span className="text-text-light group-hover:text-yellow-light transition-all duration-300">Marketing</span>
                        <i className="far fa-arrow-right text-blue-middle group-hover:text-yellow-light transition-all duration-300" />
                      </Link>
                    </li>
                    <li>
                      <Link href="blog" className="flex items-center justify-between p-3 bg-white/5 backdrop-blur-sm border border-border-light rounded-lg hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group">
                        <span className="text-text-light group-hover:text-yellow-light transition-all duration-300">SEO optimization</span>
                        <i className="far fa-arrow-right text-blue-middle group-hover:text-yellow-light transition-all duration-300" />
                      </Link>
                    </li>
                    <li>
                      <Link href="blog" className="flex items-center justify-between p-3 bg-white/5 backdrop-blur-sm border border-border-light rounded-lg hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group">
                        <span className="text-text-light group-hover:text-yellow-light transition-all duration-300">Content Marketing</span>
                        <i className="far fa-arrow-right text-blue-middle group-hover:text-yellow-light transition-all duration-300" />
                      </Link>
                    </li>
                    <li>
                      <Link href="blog" className="flex items-center justify-between p-3 bg-white/5 backdrop-blur-sm border border-border-light rounded-lg hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group">
                        <span className="text-text-light group-hover:text-yellow-light transition-all duration-300">Keywords Research</span>
                        <i className="far fa-arrow-right text-blue-middle group-hover:text-yellow-light transition-all duration-300" />
                      </Link>
                    </li>
                    <li>
                      <Link href="blog" className="flex items-center justify-between p-3 bg-white/5 backdrop-blur-sm border border-border-light rounded-lg hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group">
                        <span className="text-text-light group-hover:text-yellow-light transition-all duration-300">Technical Adult</span>
                        <i className="far fa-arrow-right text-blue-middle group-hover:text-yellow-light transition-all duration-300" />
                      </Link>
                    </li>
                  </ul>
                </div>
                <div
                  className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8"
                  data-aos="fade-up"
                  data-aos-delay={50}
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  <h4 className="card-heading text-white mb-6">Recent News</h4>
                  <ul className="space-y-4">
                    <li className="flex gap-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img src="assets/images/widget/news1.jpg" alt="News" />
                      </div>
                      <div className="flex-1">
                        <span className="small-text text-white/90">September 20, 2023</span>
                        <h6 className="mt-1">
                          <Link href="blog-details">
                            <span className="text-white hover:text-yellow-light transition-all duration-300">Achieving Fashion Elegant se Runway to Real Life</span>
                          </Link>
                        </h6>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img src="assets/images/widget/news2.jpg" alt="News" />
                      </div>
                      <div className="flex-1">
                        <span className="small-text text-white/90">September 20, 2023</span>
                        <h6 className="mt-1">
                          <Link href="blog-details">
                            <span className="text-white hover:text-yellow-light transition-all duration-300">Achieving Fashion Elegant se Runway to Real Life</span>
                          </Link>
                        </h6>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img src="assets/images/widget/news3.jpg" alt="News" />
                      </div>
                      <div className="flex-1">
                        <span className="small-text text-white/90">September 20, 2023</span>
                        <h6 className="mt-1">
                          <Link href="blog-details">
                            <span className="text-white hover:text-yellow-light transition-all duration-300">Achieving Fashion Elegant se Runway to Real Life</span>
                          </Link>
                        </h6>
                      </div>
                    </li>
                  </ul>
                </div>
                <div
                  className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8"
                  data-aos="fade-up"
                  data-aos-delay={50}
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  <h4 className="card-heading text-white mb-6">Popular Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    <Link href="blog" className="px-4 py-2 bg-blue-darkest/30 backdrop-blur-sm border border-blue-middle/20 rounded-lg text-text-light hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">Marketing</Link>
                    <Link href="blog" className="px-4 py-2 bg-blue-darkest/30 backdrop-blur-sm border border-blue-middle/20 rounded-lg text-text-light hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">Product</Link>
                    <Link href="blog" className="px-4 py-2 bg-blue-darkest/30 backdrop-blur-sm border border-blue-middle/20 rounded-lg text-text-light hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">Social Media</Link>
                    <Link href="blog" className="px-4 py-2 bg-blue-darkest/30 backdrop-blur-sm border border-blue-middle/20 rounded-lg text-text-light hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">SEO Optimize</Link>
                    <Link href="blog" className="px-4 py-2 bg-blue-darkest/30 backdrop-blur-sm border border-blue-middle/20 rounded-lg text-text-light hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">Content</Link>
                    <Link href="blog" className="px-4 py-2 bg-blue-darkest/30 backdrop-blur-sm border border-blue-middle/20 rounded-lg text-text-light hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300">Design</Link>
                  </div>
                </div>
                <div
                  className="bg-gradient-to-br from-blue-darkest/50 to-blue-middle/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl p-8 relative overflow-hidden"
                  data-aos="fade-up"
                  data-aos-delay={50}
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  <h3 className="section-heading text-white mb-4 relative z-10">Boost your Digital Product marketing?</h3>
                  <Link href="contact" className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-light hover:bg-yellow-dark text-bg-primary rounded-lg font-medium transition-all duration-300 relative z-10">
                    Contact Us <i className="far fa-arrow-right" />
                  </Link>
                  <div className="absolute bottom-0 right-0 w-32 h-32 z-0">
                    <img src="assets/images/widget/cta-man.png" alt="CTA" />
                  </div>
                  <div
                    className="absolute inset-0 bgs-cover opacity-20"
                    style={{
                      backgroundImage: "url(assets/images/widget/cta-bg.png)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AkpagerLayout>
  );
};
export default page;
