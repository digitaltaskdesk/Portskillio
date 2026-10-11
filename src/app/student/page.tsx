import RoleEntry from "@/components/RoleEntry";
export const metadata = { title: "For students | Portskillio" };
export default function Page() {
  return <RoleEntry title="Show what you can do, not just where you studied" intro="Build one portfolio from your skills, projects, certifications and internships, then share it as a link." points={["Guided portfolio builder", "Three templates with your own colors and fonts", "GitHub project import", "Public or private, your choice"]} />;
}
