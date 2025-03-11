import HeroSection from "@/components/hero-section"
import AuthorizedDealer from "@/components/authorized-dealer"
import LimitedTimeDeals from "@/components/limited-time-deals"
import NewsletterSignup from "@/components/newsletter-signup"
import GatewaySection from "@/components/gateway-section"
import SolutionsSection from "@/components/solutions-section"
import LocationsMap from "@/components/locations-map"

export default function Home() {
  return (
    <>
      <HeroSection />
      <AuthorizedDealer />
      <LimitedTimeDeals />
      <NewsletterSignup />
      <GatewaySection />
      <SolutionsSection />
      <LocationsMap />
    </>
  )
}

