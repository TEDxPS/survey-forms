export const json = {
  title: "TEDxPS Volunteer Application Form",
  showQuestionNumbers: "onPage",
  pages: [
    {
      name: "Personal Information",
      elements: [
        {
          type: "text",
          inputType: "email",
          name: "email",
          title: "Email",
          isRequired: true,
        },
        {
          type: "text",
          name: "name_ic",
          title: "Name as per IC",
          isRequired: true
        },
        {
          type: "text",
          name: "nickname",
          title: "Nickname",
        },
        {
          type: "radiogroup",
          name: "gender",
          title: "Gender",
          isRequired: true,
          choices: ["Female", "Male", "Other"],
        },
        {
          type: "dropdown",
          name: "age_group",
          title: "Age Group",
          isRequired: true,
          choices: [
            "Under 18",
            "18-24",
            "25-34",
            "35-44",
            "45-54",
            "55-64",
            "65 or older",
          ],
        },
        {
          type: "text",
          inputType: "tel",
          name: "contact",
          title: "Contact Number",
          isRequired: true,
          placeHolder: "e.g. 60123456789",
          validators: [
            {
              type: "regex",
              text: "Should be phone format",
              regex: "\\d{10,11}"
            }
          ]
        },
        {
          type: "radiogroup",
          name: "language_preference",
          title: "Language Preference",
          isRequired: true,
          choices: [
            "I would prefer to answer in Mandarin",
            "I would prefer an English response",
          ],
        },
        {
          type: "text",
          name: "education",
          title: "Highest Education Background",
          isRequired: true,
          placeHolder:
            "e.g. Bachelor of Arts major in communications and media studies",
        },
      ],
    },
    {
      name: "Experience & Expertise",
      elements: [
        {
          type: "text",
          name: "mandarin_proficiency",
          title: "Can you read and write in Mandarin?",
          isRequired: true,
        },
        {
          type: "text",
          name: "current_industry",
          title: "Current Working Industry/Study",
          isRequired: true,
          placeHolder: "If you are a student, please mention your course.",
        },
        {
          type: "comment",
          name: "tedx_attendance",
          title:
            "Have you attended any TEDxPetalingStreet events before? If yes, please share which ones.",
        },
      ],
    },
    {
      name: "Volunteer Preferences",
      elements: [
        {
          type: "radiogroup",
          name: "volunteer_preference",
          title:
            "Which option best describes your preference for joining us as a volunteer in TEDxPetalingStreet?",
          isRequired: true,
          choices: [
            "I want to join a role that is more relevant to what I studied/I am working",
            "I want to try something new / open to any opportunity",
          ],
        },
        {
          type: "comment",
          name: "other_volunteering_experience",
          title:
            "Any volunteering experience other than TEDx? Please describe your role.",
        },
      ],
    },
    {
      name: "Group Choices",
      elements: [
        {
          type: "dropdown",
          name: "first_choice",
          title: "[FIRST CHOICE] In which group do you wish to join?",
          isRequired: true,
          choices: [
            "Editorial",
            "Visual - Graphic/ Animation Design",
            "Social Media Team",
            "Video & Photo Team",
            "Information Management",
            "Partnership - Monetary & In-Kind",
            "Food & Beverage",
            "Ticketing",
            "Public Relations",
            "Experience - Pop Up/ Merchandize/ Adventure",
            "Speaker Curation",
            "Stage Management",
            "Production",
          ],
        },
        {
          type: "dropdown",
          name: "second_choice",
          title: "[SECOND CHOICE] In which group do you wish to join?",
          isRequired: true,
          choices: [
            "Editorial",
            "Visual - Graphic/ Animation Design",
            "Social Media Team",
            "Video & Photo Team",
            "Information Management",
            "Partnership - Monetary & In-Kind",
            "Food & Beverage",
            "Ticketing",
            "Public Relations",
            "Experience - Pop Up/ Merchandize/ Adventure",
            "Speaker Curation",
            "Stage Management",
            "Production",
          ],
        },
      ],
    },
    {
      name: "Design & Social Media",
      elements: [
        {
          type: "comment",
          name: "design_question",
          title:
            "For Visual - Graphic/ Animation Design: Please write about one of your favourite books or advertisements.",
        },
        {
          type: "comment",
          name: "design_question_chinese",
          title: "Please translate your answer above into Chinese.",
        },
        {
          type: "comment",
          name: "social_media_improvement",
          title:
            "What do you think needs to be improved for TEDxPetalingStreet's previous copywriting on social media?",
        },
      ],
    },
    {
      name: "Design Tools",
      elements: [
        {
          type: "text",
          name: "design_software",
          title:
            "What software do you use for graphic design? (e.g., Adobe Illustrator, InDesign, Photoshop, After Effects, Animate)",
        },
        {
          type: "rating",
          name: "software_proficiency",
          title:
            "How proficient are you with the above software? (Rate 1 to 10)",
          isRequired: true,
          minRateDescription: "1",
          maxRateDescription: "10",
          rateMin: 1,
          rateMax: 10,
        },
        {
          type: "comment",
          name: "design_portfolio",
          title:
            "Please provide some of your design portfolios for assessment purposes.",
        },
      ],
    },
    {
      name: "Social Media & Photography",
      elements: [
        {
          type: "radiogroup",
          name: "social_media_experience",
          title:
            "Have you previously worked on social media post design and layout design?",
          isRequired: true,
          choices: ["Yes", "No"],
        },
        {
          type: "comment",
          name: "social_media_design_aspects",
          title:
            "What aspects of design do you usually engage with most? (e.g., branding, print layout, web/UIUX, packaging, social media, poster design)",
        },
        {
          type: "text",
          name: "preferred_social_media",
          title:
            "Which social media platform do you use most? (Feel free to provide account details)",
        },
        {
          type: "comment",
          name: "social_media_management",
          title:
            "Do you have experience in managing social media accounts? Please describe.",
        },
        {
          type: "comment",
          name: "social_media_improvement_platform",
          title:
            "Suggest one (or up to two) social media platforms (e.g., Facebook, Instagram, TikTok, XiaoHongShu) for TEDxPetalingStreet and how we can improve publicity.",
        },
        {
          type: "radiogroup",
          name: "photography_videography",
          title:
            "For Photography & Videography: Are you more specialized in Photography/Photos, Filming/Videos, or Both?",
          isRequired: true,
          choices: ["Photography/Photos", "Filming/Videos", "Both"],
        },
        {
          type: "radiogroup",
          name: "weekday_shoot",
          title: "Is it possible to shoot on weekdays?",
          choices: ["Yes", "No"],
        },
        {
          type: "text",
          name: "shoot_notice",
          title:
            "How far in advance do we need to confirm the schedule with you?",
        },
      ],
    },
    {
      name: "Ticketing & Customer Service",
      elements: [
        {
          type: "radiogroup",
          name: "customer_service",
          title: "Are you able to do customer service related work?",
          isRequired: true,
          choices: ["Yes", "No"],
        },
        {
          type: "radiogroup",
          name: "liaison_teacher",
          title:
            "Can you act as a liaison officer for teachers from schools attending the event?",
          isRequired: true,
          choices: ["Yes", "No"],
        },
        {
          type: "radiogroup",
          name: "note_taking",
          title:
            "Can you take notes/minutes at meetings (e.g., at Timeless Design near LRT PWTC on a weekday evening)?",
          isRequired: true,
          choices: ["Yes", "No"],
        },
      ],
    },
    {
      name: "Writing & Public Relations",
      elements: [
        {
          type: "comment",
          name: "writing_experience",
          title:
            "Do you have any writing experience (articles, captions, blogs, etc.)? If yes, please share references. If no, would you be interested in writing?",
        },
        {
          type: "comment",
          name: "favorite_media",
          title:
            "List 3 of your most favourite Malaysian online media/self-media and explain why.",
        },
        {
          type: "comment",
          name: "favorite_animal",
          title: "What animal is your personality most similar to? Why?",
        },
      ],
    },
    {
      name: "Additional Experience",
      elements: [
        {
          type: "comment",
          name: "pop_up_experience",
          title:
            "What other events have you participated in (aside from TEDxPetalingStreet) and what was the most amazing experience you had?",
        },
      ],
    },
    {
      name: "Speaker Curation",
      elements: [
        {
          type: "comment",
          name: "speaker_content",
          title:
            "After watching the provided talks, what are the commendable aspects of the speakers' talks?",
        },
        {
          type: "comment",
          name: "speaker_improvement",
          title:
            "How can we improve their content? (Consider context, text arrangement, examples, etc.)",
        },
        {
          type: "comment",
          name: "speaker_ideas",
          title: "What specific ideas did these two speakers share?",
        },
      ],
    },
    {
      name: "Volunteer Management",
      elements: [
        {
          type: "radiogroup",
          name: "volunteer_management_division",
          title:
            "Within the Volunteer Management Team, which division would you prefer?",
          isRequired: true,
          choices: ["Documentation Team", "Activity Team"],
        },
        {
          type: "comment",
          name: "volunteer_management_experience",
          title:
            "Describe your recent activity/event experience, including your role.",
        },
        {
          type: "comment",
          name: "volunteer_subdivision",
          title:
            "If you were to focus on one subdivision within Volunteer Management, which would it be and why?",
        },
        {
          type: "comment",
          name: "nezha_role",
          title:
            "If you were a character in the animated movie Nezha 2, who would you be and why?",
        },
      ],
    },
    {
      name: "Interview & Availability",
      elements: [
        {
          type: "checkbox",
          name: "interview_slots",
          title: "Preferred interview date and time",
          isRequired: true,
          choices: [
            "23/3 Slot A - 11am",
            "23/3 Slot B - 3pm",
            "23/3 Slot C - 5pm",
            "24/3 Slot A - 11am",
            "24/3 Slot B - 3pm",
            "24/3 Slot C - 5pm",
            "Unable to attend any of the above slots, arrange online interview",
          ],
        },
        {
          type: "checkbox",
          name: "major_events",
          title: "Availability for major events",
          isRequired: true,
          choices: [
            "24 May 2025 | Orientation Day",
            "27 Sep 2025 | Briefing Day",
            "09 Oct 2025 | Rehearsal Day",
            "10 Oct 2025 | Rehearsal Day",
            "11 Oct 2025 | Event Day",
            "18 Oct 2025 | Appreciation Dinner",
          ],
        },
      ],
    },
    {
      name: "Additional Information",
      elements: [
        {
          type: "text",
          name: "location",
          title:
            "Where do you stay/spend most of your time (especially from April 2025 to October 2025)?",
        },
        {
          type: "comment",
          name: "crazy_experience",
          title:
            "Describe the craziest or most fun thing you’ve ever done. What made it so memorable?",
        },
        {
          type: "comment",
          name: "global_message",
          title:
            "If you could send one text message to everyone on Earth, what would it be and why?",
        },
        {
          type: "comment",
          name: "additional_info",
          title:
            "Any additional info you want us to know about you (hobbies, talents, skills, etc.)?",
        },
      ],
    },
  ],
  triggers: [
    {
      type: "skip",
      expression: "{first_choice} = 'Editorial'",
      gotoName: "Writing & Public Relations",
    },
    {
      type: "skip",
      expression: "{first_choice} = 'Visual - Graphic/ Animation Design'",
      gotoName: "Design Tools",
    },
    {
      type: "skip",
      expression: "{first_choice} = 'Social Media Team'",
      gotoName: "Social Media & Photography",
    },
    {
      type: "skip",
      expression: "{first_choice} = 'Video & Photo Team'",
      gotoName: "Social Media & Photography",
    },
    {
      type: "skip",
      expression: "{first_choice} = 'Information Management'",
      gotoName: "Interview & Availability",
    },
    {
      type: "skip",
      expression: "{first_choice} = 'Partnership - Monetary & In-Kind'",
      gotoName: "Interview & Availability",
    },
    {
      type: "skip",
      expression: "{first_choice} = 'Food & Beverage'",
      gotoName: "Interview & Availability",
    },
    {
      type: "skip",
      expression: "{first_choice} = 'Ticketing'",
      gotoName: "Ticketing & Customer Service",
    },
    {
      type: "skip",
      expression: "{first_choice} = 'Public Relations'",
      gotoName: "Writing & Public Relations",
    },
    {
      type: "skip",
      expression:
        "{first_choice} = 'Experience - Pop Up/ Merchandize/ Adventure'",
      gotoName: "Additional Experience",
    },
    {
      type: "skip",
      expression: "{first_choice} = 'Speaker Curation'",
      gotoName: "Speaker Curation",
    },
    {
      type: "skip",
      expression: "{first_choice} = 'Stage Management'",
      gotoName: "Interview & Availability",
    },
    {
      type: "skip",
      expression: "{first_choice} = 'Production'",
      gotoName: "Interview & Availability",
    },
  ],
};
