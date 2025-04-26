import React from "react";

const ProjectCard = ({ name, description }) => {
  return (
    <article className="projects__card">
      <h2 className="heading heading-2">{name}</h2>
      <p>{description}</p>
    </article>
  );
};

export default ProjectCard;
