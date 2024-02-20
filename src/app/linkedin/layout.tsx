import LinkedinNavigation from "@/components/linkedin-navigation/linkedin-navitation"

export default function LinkedinLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <LinkedinNavigation/>
 
      {children}
    </section>
  )
} 