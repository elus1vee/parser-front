import InstagramNavigation from "@/components/insta-navigation/insta-navigation";

export default function LinkedinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <InstagramNavigation />

      {children}
    </section>
  );
}
