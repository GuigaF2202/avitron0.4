import React from 'react';

const TeamMember = ({ image, role, name, description }) => {
  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex mx-auto my-10">
      <div 
        className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        style={{ backgroundImage: `url(${image})` }}
        title={`${name} profile`}
      />
      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4">
        <div>
          <a href="#" className="text-gray-900 font-bold text-xl mb-2 hover:text-indigo-600 transition duration-500 ease-in-out">
            {name}
          </a>
          <p className="text-sm text-gray-600">
            {role}
          </p>
          <p className="text-gray-500 text-base mt-4">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const Team = () => {
  const teamMembers = [
    {
      image: "images/alex.jpg",
      role: "CEO & Founder",
      name: "Alex Ferraris",
      description: "Since 2007, Alex Ferraris has been a true pioneer in the world of virtual reality, pushing the boundaries of immersive online experiences and building communities in the metaverse long before it became a mainstream concept."
    },
    {
      image: "images/guiga.jpg",
      role: "Systems Developer",
      name: "Luiz Guilherme",
      description: "I am a systems developer at Avitron Multiverso, driven by the passion to build a better future and continuously improve through technology."
    }
  ];

  return (
    <div className="p-10 max-w-screen-lg mx-auto">
      <div className="text-center mb-4">
        <p className="mt-4 text-sm leading-7 text-gray-500 font-regular">
          THE TEAM
        </p>
        <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
          Our<span className="text-indigo-600"> Team</span>
        </h3>
      </div>
      <div className="sm:grid grid-cols-2 gap-6 my-10">
        {teamMembers.map((member, index) => (
          <TeamMember
            key={index}
            image={member.image}
            role={member.role}
            name={member.name}
            description={member.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Team;