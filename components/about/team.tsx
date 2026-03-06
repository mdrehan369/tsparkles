import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const team = [
  {
    name: "Sarah Morgan",
    role: "Founder & Creative Director",
    bio: "A lifelong believer in the power of scent and ambiance, Sarah founded the company to share her passion for handmade beauty.",
    image: "/placeholder-user.jpg",
  },
  {
    name: "James Chen",
    role: "Head of Production",
    bio: "With 15+ years in artisan craftsmanship, James ensures every candle meets our exacting standards.",
    image: "/placeholder-user.jpg",
  },
  {
    name: "Elena Rodriguez",
    role: "Scent & Fragrance",
    bio: "Elena curates our signature scents, blending traditional techniques with innovative aromatic experiences.",
    image: "/placeholder-user.jpg",
  },
];

export function AboutTeam() {
  return (
    <section className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mb-12 space-y-4 text-center">
          <h2 className="text-3xl font-semibold md:text-4xl">Meet the Team</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            The passionate individuals behind every candle we create.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {team.map((member) => (
            <Card key={member.name}>
              <CardContent className="p-0">
                <div className="relative h-64 w-full overflow-hidden rounded-t-lg bg-secondary">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-3 p-6">
                  <div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-primary">{member.role}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
