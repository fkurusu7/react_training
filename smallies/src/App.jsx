import ProjectCard from "./components/ProjectCard";
import projects from "./data";

const App = () => {
  return (
    <section className="container">
      <h1 className="heading heading-1">Small Projects</h1>

      <section className="projects">
        {projects.map((project) => (
          <ProjectCard
            name={project.name}
            description={project.description}
            component={project.component}
          />
        ))}
      </section>
    </section>
  );
};

export default App;
