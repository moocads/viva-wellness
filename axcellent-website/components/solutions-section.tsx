import { Globe, DollarSign, Clock, Users } from "lucide-react"

export default function SolutionsSection() {
  const solutions = [
    {
      icon: <Globe className="h-8 w-8 text-white" />,
      title: "Multilingual Support",
      img:"/images/multilingual.jpg",
      description:
        "Our staff speaks multiple languages to serve Canada's diverse communities with clear communication.",
    },
    {
      icon: <DollarSign className="h-8 w-8 text-white" />,
      title: "Competitive Pricing",
      img:"/images/competitive-pricing.jpg",
      description: "Enjoy cost-effective solutions with competitive pricing, giving you the best value for your money.",
    },
    {
      icon: <Clock className="h-8 w-8 text-white" />,
      title: "Quick Response",
      img:"/images/quick-response.jpg",
      description: "Our dedicated team provides reliable support to solve your communication needs promptly.",
    },
    {
      icon: <Users className="h-8 w-8 text-white" />,
      title: "Newcomer Friendly",
      img:"/images/newcomer.jpg",
      description: "We help Canada's newcomers get connected, making it easier for you to start your new journey.",
    },
  ]

  return (
    <section className="bg-[#005daa] py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm mb-2">Why Choose Axcellent Communications</p>
          <h2 className="text-2xl md:text-3xl font-bold">
            SEAMLESS SOLUTIONS FOR
            <br />
            CANADA'S DIVERSE COMMUNITIES
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((solution, index) => (
            <div key={index} className="bg-white rounded-[30px] p-2">
              <div className="rounded-lg inline-block mb-4">
                <img src={solution.img} className="rounded-[30px]" alt={"Axcellent Bell Dealer"+ solution.title} />
              </div>
              <h3 className="text-lg font-bold mb-0 text-center text-[#10306C]">{solution.title}</h3>
              <p className="text-sm p-3 text-center text-[#668394]">{solution.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

