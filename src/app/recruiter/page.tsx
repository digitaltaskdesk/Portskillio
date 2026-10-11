import RoleEntry from "@/components/RoleEntry";
export const metadata = { title: "For recruiters | Portskillio" };
export default function Page() {
  return <RoleEntry title="Find candidates by evidence, not keywords on a CV" intro="Search by skills and projects, match against a job description, and see exactly why each student scored the way they did." points={["Skill, project and education filters", "Explainable match scores", "Compare and shortlist", "Organization approval keeps the pool trusted"]} />;
}
