import { Code, Layers, Zap } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "Lightning Fast",
      description: "Optimized for speed with server-side rendering and static site generation capabilities.",
    },
    {
      icon: <Layers className="h-10 w-10 text-primary" />,
      title: "Component-Based",
      description: "Build your UI with reusable components for consistent design and faster development.",
    },
    {
      icon: <Code className="h-10 w-10 text-primary" />,
      title: "Developer Experience",
      description: "Enjoy features like Fast Refresh, TypeScript support, and file-based routing.",
    },
  ]

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build modern web applications
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-background p-8 rounded-lg shadow-sm border">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

