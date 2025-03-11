import Image from "next/image"

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "Next.js has transformed how we build web applications. The performance gains and developer experience are unmatched.",
      author: "Sarah Johnson",
      role: "CTO, TechCorp",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "The flexibility of Next.js allowed our team to ship features faster while maintaining excellent performance.",
      author: "Michael Chen",
      role: "Lead Developer, StartupX",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "We migrated our entire platform to Next.js and saw immediate improvements in load times and SEO rankings.",
      author: "Emma Rodriguez",
      role: "Product Manager, GrowthLabs",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What People Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trusted by developers and companies worldwide
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-muted/30 p-8 rounded-lg border">
              <div className="flex flex-col h-full">
                <blockquote className="text-lg mb-6 flex-grow">"{testimonial.quote}"</blockquote>
                <div className="flex items-center">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

