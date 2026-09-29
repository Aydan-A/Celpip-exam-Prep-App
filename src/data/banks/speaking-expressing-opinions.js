// CELPIP Speaking Part 7 — "Expressing Opinions" bank (86).
// Titles and topics follow the user's reference list (#1–42 and #45–88, same
// order; #43–44 were not in the screenshots). Claude wrote the questions at
// the user's request, in exam style: a short situation, then one question the
// test-taker answers with their opinion and reasons.
export const EXPRESSING_OPINIONS_TOPICS = [
  'Education & Learning',
  'Community & Services',
  'Environment & Nature',
  'Technology & Online',
  'Work & Career',
  'Health & Wellness',
  'Money & Shopping',
  'Home & Housing',
  'Travel & Transport',
  'Food & Dining',
  'Leisure & Culture',
  'Family & Friends',
];

export const SPEAKING_EXPRESSING_OPINIONS = [
  {
    title: 'Rental Pet Regulations',
    topic: 'Home & Housing',
    prompt: 'Many landlords do not allow tenants to keep pets, which makes it hard for pet owners to find a place to live. Some cities are considering a law that would stop landlords from refusing tenants just because they have a pet. Should landlords be required to accept tenants with pets? Explain your reasons.',
  },
  {
    title: 'Four-Day Work Week',
    topic: 'Work & Career',
    prompt: 'Some companies have moved to a four-day work week, where employees work longer hours on four days and get a three-day weekend. Should more companies adopt a four-day work week? Explain your reasons.',
  },
  {
    title: 'Restaurant Tipping Elimination',
    topic: 'Food & Dining',
    prompt: 'In Canada, customers usually tip servers 15–20%. Some restaurants have stopped accepting tips and instead raised their menu prices so they can pay staff a higher wage. Should restaurants replace tipping with higher wages? Explain your reasons.',
  },
  {
    title: 'Compulsory Student Finance',
    topic: 'Education & Learning',
    prompt: 'Many students graduate from college or university with large debts they do not fully understand. Some people think students should have to complete a personal finance course before they can receive a student loan. Should this course be compulsory? Explain your reasons.',
  },
  {
    title: 'Applicant Social Media Checks',
    topic: 'Work & Career',
    prompt: 'Some employers look through job applicants\' social media accounts before deciding whether to hire them. Others believe a person\'s private online life should have nothing to do with their job. Should employers be allowed to check applicants\' social media? Explain your reasons.',
  },
  {
    title: 'Dedicated Tourist Transit',
    topic: 'Travel & Transport',
    prompt: 'In popular tourist cities, buses and trains are often crowded with visitors, and local residents complain that they cannot get to work on time. Some cities have proposed separate transit lines just for tourists, paid for by a tourist tax. Is this a good idea? Explain your reasons.',
  },
  {
    title: 'Hospital Device Bans',
    topic: 'Health & Wellness',
    prompt: 'Some hospitals do not allow patients and visitors to use mobile phones or laptops in certain areas, saying they disturb other patients and staff. Others say these devices help patients stay connected with their families. Should hospitals ban personal devices in patient areas? Explain your reasons.',
  },
  {
    title: 'Residential EV Chargers',
    topic: 'Home & Housing',
    prompt: 'More people are buying electric cars, but many apartment residents have nowhere to charge them. Some cities want to require all new residential buildings to include electric vehicle chargers, even though this would raise the cost of housing. Should this be required? Explain your reasons.',
  },
  {
    title: 'Classroom VR Technology',
    topic: 'Education & Learning',
    prompt: 'Virtual reality headsets let students "visit" historic places, explore the human body, or practise science experiments without leaving the classroom. However, the equipment is expensive. Should schools spend money on virtual reality technology for classrooms? Explain your reasons.',
  },
  {
    title: 'Disposable Packaging Fees',
    topic: 'Environment & Nature',
    prompt: 'Take-out restaurants and coffee shops use a large amount of single-use cups, containers and cutlery. Some cities want to charge customers a small fee for every disposable item to encourage them to bring their own. Is this a good idea? Explain your reasons.',
  },
  {
    title: 'Anonymous Online Comments',
    topic: 'Technology & Online',
    prompt: 'Many websites and social media platforms allow people to post comments without using their real names. Some people say this leads to bullying and false information, while others say it protects free speech. Should websites require people to use their real names when posting comments? Explain your reasons.',
  },
  {
    title: 'Zero-Waste Grocery Mandate',
    topic: 'Environment & Nature',
    prompt: 'Some grocery stores have removed plastic packaging and ask customers to bring their own containers for products like rice, nuts and cleaning supplies. A city council is considering making this a rule for all large grocery stores. Should grocery stores be required to go zero-waste? Explain your reasons.',
  },
  {
    title: 'Parental Internet Supervision',
    topic: 'Technology & Online',
    prompt: 'Some parents check their children\'s messages, browsing history and social media accounts to keep them safe online. Others believe this damages trust and children need privacy. Should parents closely monitor their children\'s internet use? Explain your reasons.',
  },
  {
    title: 'Early Second-Language Education',
    topic: 'Education & Learning',
    prompt: 'In many schools, children do not begin learning a second language until they are about ten years old. Some people believe children should start learning a second language in kindergarten. Should second-language education begin at a very young age? Explain your reasons.',
  },
  {
    title: 'Restaurant Food Donations',
    topic: 'Environment & Nature',
    prompt: 'Restaurants throw away large amounts of food that is still safe to eat at the end of each day. Some governments have passed laws requiring restaurants to donate this food to shelters and food banks. Should restaurants be required to donate their unsold food? Explain your reasons.',
  },
  {
    title: 'High School Smartphone Rules',
    topic: 'Education & Learning',
    prompt: 'Some high schools have banned smartphones during the school day, including at lunch and between classes. Supporters say it improves focus, while others say students need their phones for safety and learning. Should high schools ban smartphones for the whole school day? Explain your reasons.',
  },
  {
    title: 'Outdoor Advertising Restrictions',
    topic: 'Community & Services',
    prompt: 'Some cities have limited or banned billboards and large outdoor advertisements, saying they make streets look crowded and distract drivers. Businesses say these ads are important for their success. Should cities restrict outdoor advertising? Explain your reasons.',
  },
  {
    title: 'Alternative Medicine Funding',
    topic: 'Health & Wellness',
    prompt: 'Many people use treatments such as acupuncture, massage therapy and naturopathy. At present, public health insurance usually does not pay for them. Should the government pay for alternative medicine treatments? Explain your reasons.',
  },
  {
    title: 'Dating App Background Checks',
    topic: 'Technology & Online',
    prompt: 'Many people now meet partners through dating apps, and some users have been harmed by people they met online. Some people think dating apps should be required to run criminal background checks on all users. Is this a good idea? Explain your reasons.',
  },
  {
    title: 'Holiday Retail Hours',
    topic: 'Money & Shopping',
    prompt: 'In some places, shops and malls are required to close on public holidays so that employees can spend time with their families. In other places, stores can stay open to serve customers. Should stores be required to close on public holidays? Explain your reasons.',
  },
  {
    title: 'Promoting Medical Tourism',
    topic: 'Health & Wellness',
    prompt: 'Some countries attract visitors from abroad who pay for surgery and other medical treatment, which brings money into the economy. Critics say this could make waiting times longer for local patients. Should the government promote medical tourism? Explain your reasons.',
  },
  {
    title: 'Indigenous Exchange Requirement',
    topic: 'Education & Learning',
    prompt: 'Some schools offer programs where students spend time learning from local Indigenous communities about their history, languages and traditions. Some people think this should be a required part of every high school education. Should high school students be required to take part in an Indigenous learning exchange? Explain your reasons.',
  },
  {
    title: 'Standardised Retail Return Policies',
    topic: 'Money & Shopping',
    prompt: 'Return policies are different in every store — some give 90 days and a full refund, while others give only store credit or no returns at all. Some people think the government should set one standard return policy that all stores must follow. Do you agree? Explain your reasons.',
  },
  {
    title: 'Youth Sports Subsidies',
    topic: 'Community & Services',
    prompt: 'Registration fees, equipment and travel for youth sports can cost families thousands of dollars a year. Some people think the government should pay part of these costs so that every child can play. Should the government subsidise youth sports? Explain your reasons.',
  },
  {
    title: 'Digital Asset Inheritance',
    topic: 'Technology & Online',
    prompt: 'When a person dies, their family often cannot access their email, photos, social media or online accounts. Some people believe families should automatically have the right to access these accounts, while others think they should stay private. Should families be able to inherit a person\'s digital accounts? Explain your reasons.',
  },
  {
    title: 'School Stress Management',
    topic: 'Education & Learning',
    prompt: 'Many students today report high levels of stress and anxiety. Some schools have added regular classes that teach stress management, mindfulness and healthy habits, which means less time for other subjects. Should stress management be a required school subject? Explain your reasons.',
  },
  {
    title: 'Gender-Neutral Marketing',
    topic: 'Money & Shopping',
    prompt: 'Toys, clothes and personal care products are often marketed as "for boys" or "for girls". Some stores have removed these labels and now display products in gender-neutral sections. Should stores stop marketing products by gender? Explain your reasons.',
  },
  {
    title: 'Water Conservation Curriculum',
    topic: 'Education & Learning',
    prompt: 'Droughts and water shortages are becoming more common in some regions. Some people think elementary schools should teach a unit on saving water every year. Should water conservation be a required part of the school curriculum? Explain your reasons.',
  },
  {
    title: 'Workplace Nap Breaks',
    topic: 'Work & Career',
    prompt: 'Some companies have created quiet rooms where employees can take a short nap during the workday, saying it improves energy and productivity. Others think naps at work are unprofessional. Should employers allow nap breaks at work? Explain your reasons.',
  },
  {
    title: 'Streaming Royalty Requirements',
    topic: 'Leisure & Culture',
    prompt: 'Music and video streaming services earn large profits, but many artists say they receive only a tiny payment each time their work is played. Some people think the government should require streaming companies to pay artists more. Do you agree? Explain your reasons.',
  },
  {
    title: 'Universal Daycare Subsidies',
    topic: 'Community & Services',
    prompt: 'Childcare is very expensive, and some parents cannot return to work because they cannot afford it. Some people believe the government should pay for daycare for every family, regardless of income. Should daycare be subsidised for all families? Explain your reasons.',
  },
  {
    title: 'High School Disaster Training',
    topic: 'Education & Learning',
    prompt: 'Wildfires, floods and earthquakes affect more communities each year. Some people think every high school student should complete emergency training, such as first aid and evacuation planning, before they graduate. Should disaster training be required in high school? Explain your reasons.',
  },
  {
    title: 'Street Vendor Regulations',
    topic: 'Food & Dining',
    prompt: 'Food trucks and street vendors are popular in many cities, but nearby restaurant owners complain that they take their customers and do not pay the same rent and taxes. Should cities place stricter limits on where and when street vendors can sell food? Explain your reasons.',
  },
  {
    title: 'School Sign Language Curriculum',
    topic: 'Education & Learning',
    prompt: 'Very few people can communicate with members of the Deaf community. Some people think all elementary school students should learn basic sign language as part of their regular classes. Should sign language be taught in all schools? Explain your reasons.',
  },
  {
    title: 'Intergenerational Housing Communities',
    topic: 'Home & Housing',
    prompt: 'Some new housing projects are designed so that seniors, young families and students live in the same building and share common spaces. Supporters say this reduces loneliness and builds community. Should cities encourage more intergenerational housing? Explain your reasons.',
  },
  {
    title: 'Daylight Saving Time',
    topic: 'Community & Services',
    prompt: 'Twice a year, clocks are moved forward or back one hour for daylight saving time. Some people say this change harms sleep and causes accidents, while others enjoy the longer summer evenings. Should we stop changing the clocks? Explain your reasons.',
  },
  {
    title: 'Classroom Device Permissions',
    topic: 'Education & Learning',
    prompt: 'Some schools allow students to bring their own laptops and tablets to use in class, while others only allow school-owned devices or none at all. Should students be allowed to use their own devices in the classroom? Explain your reasons.',
  },
  {
    title: 'Student Healthcare Volunteering',
    topic: 'Education & Learning',
    prompt: 'Hospitals and care homes are short of staff and volunteers. Some people think high school students should be required to complete volunteer hours in a healthcare setting before they graduate. Is this a good idea? Explain your reasons.',
  },
  {
    title: 'Guaranteed Monthly Income',
    topic: 'Community & Services',
    prompt: 'Some cities have tested programs that give low-income families a fixed monthly payment with no conditions on how it is spent. Supporters say it reduces poverty, while critics say it discourages work. Should governments provide a guaranteed monthly income to low-income families? Explain your reasons.',
  },
  {
    title: 'Public School Music Funding',
    topic: 'Education & Learning',
    prompt: 'When school budgets are cut, music programs are often among the first to be reduced or removed. Some people believe music is just as important as math and science. Should public schools protect funding for music programs? Explain your reasons.',
  },
  {
    title: 'Stricter E-Commerce Returns',
    topic: 'Money & Shopping',
    prompt: 'Many online shoppers order several sizes or colours and return most of them for free, which creates waste and extra delivery trips. Some online stores have started charging a fee for returns. Should online stores charge customers for returns? Explain your reasons.',
  },
  {
    title: 'School Winter Sports Funding',
    topic: 'Education & Learning',
    prompt: 'Winter sports such as skiing, skating and hockey can be expensive, so many children never get to try them. Some people think schools should pay for every student to take part in winter sports programs. Should schools fund winter sports for students? Explain your reasons.',
  },
  {
    title: 'Paid Training Hours',
    topic: 'Work & Career',
    prompt: 'Some employers ask new staff to complete training courses or safety programs on their own time without pay. Others believe any time spent training for a job should be paid. Should employers be required to pay employees for all training hours? Explain your reasons.',
  },
  {
    title: 'Residential Green Space Mandates',
    topic: 'Environment & Nature',
    prompt: 'As cities grow, many new neighbourhoods are built with very few parks or trees. Some people think developers should be required to set aside a certain amount of land as green space in every new housing project, even if it makes homes more expensive. Do you agree? Explain your reasons.',
  },
  {
    title: 'Mental Wellness Leave',
    topic: 'Work & Career',
    prompt: 'Burnout and stress are common reasons people leave their jobs. Some people think the law should give every employee the right to take several weeks of paid leave to recover from burnout. Should mental wellness leave be guaranteed by law? Explain your reasons.',
  },
  {
    title: 'High School Road Safety',
    topic: 'Education & Learning',
    prompt: 'Young drivers are involved in a large number of traffic accidents. Some people think every high school should include a road safety and driver education course as a required class. Should road safety be a required high school subject? Explain your reasons.',
  },
  {
    title: 'Telemedicine Coverage',
    topic: 'Health & Wellness',
    prompt: 'Many patients now see their doctor through video calls instead of visiting a clinic. Some people think these online appointments should be fully covered by public health insurance, the same as in-person visits. Do you agree? Explain your reasons.',
  },
  {
    title: 'Residential Property Limits',
    topic: 'Home & Housing',
    prompt: 'In many cities, housing prices have risen quickly, partly because some investors buy many homes to rent out or resell. Some people think there should be a limit on how many residential properties one person can own. Should this limit exist? Explain your reasons.',
  },
  {
    title: 'Public School Uniforms',
    topic: 'Education & Learning',
    prompt: 'Most public schools in Canada let students choose their own clothes, while many private schools require uniforms. Some people believe uniforms reduce bullying and pressure to wear expensive clothes. Should public schools require uniforms? Explain your reasons.',
  },
  {
    title: 'Public Surveillance Cameras',
    topic: 'Community & Services',
    prompt: 'Some cities have installed security cameras in parks, streets and transit stations to help prevent crime. Others worry that these cameras invade people\'s privacy. Should cities install more surveillance cameras in public places? Explain your reasons.',
  },
  {
    title: 'Cultural Heritage Curriculum',
    topic: 'Education & Learning',
    prompt: 'Classrooms today include students from many different cultural backgrounds. Some people think schools should teach a regular course on the history and traditions of the cultures in their community. Should cultural heritage be part of the curriculum? Explain your reasons.',
  },
  {
    title: 'Fitness Tracker Insurance Discounts',
    topic: 'Health & Wellness',
    prompt: 'Some insurance companies offer lower prices to customers who wear a fitness tracker and share their activity data. Supporters say it encourages healthy habits, while critics worry about privacy and fairness. Is this a good practice? Explain your reasons.',
  },
  {
    title: 'Cashless Business Rights',
    topic: 'Money & Shopping',
    prompt: 'More and more shops and restaurants accept only card or phone payments and refuse cash. Some people say this is unfair to seniors and people without bank accounts. Should businesses be allowed to refuse cash? Explain your reasons.',
  },
  {
    title: 'Universal High-Speed Internet',
    topic: 'Technology & Online',
    prompt: 'Many rural and remote communities still do not have reliable high-speed internet, which makes it hard to work, study or see a doctor online. Some people think the government should guarantee fast internet for every home, just like water and electricity. Do you agree? Explain your reasons.',
  },
  {
    title: 'Newcomer Integration Classes',
    topic: 'Community & Services',
    prompt: 'New immigrants often need help understanding local laws, services and culture. Some people think every newcomer should be required to attend free integration classes during their first year in the country. Should these classes be mandatory? Explain your reasons.',
  },
  {
    title: 'Delivery App Worker Benefits',
    topic: 'Work & Career',
    prompt: 'People who deliver food and packages through apps are usually treated as independent contractors, so they do not receive sick pay, vacation or a minimum wage. Should delivery app companies be required to give their workers the same benefits as regular employees? Explain your reasons.',
  },
  {
    title: 'Compulsory Voting Laws',
    topic: 'Community & Services',
    prompt: 'In some countries, such as Australia, voting in elections is required by law. In Canada, voting is a choice, and many people do not vote. Should voting be compulsory? Explain your reasons.',
  },
  {
    title: 'Age Limits on Socials',
    topic: 'Technology & Online',
    prompt: 'Some countries have proposed laws that would stop children under 16 from opening social media accounts. Supporters say it protects mental health, while others say it is the parents\' decision. Should there be a legal minimum age of 16 for social media? Explain your reasons.',
  },
  {
    title: 'Student Loan Forgiveness',
    topic: 'Education & Learning',
    prompt: 'Many graduates spend ten years or more repaying their student loans. Some people believe the government should cancel all or part of this debt, while others say it is unfair to people who already paid or did not go to school. Should student loans be forgiven? Explain your reasons.',
  },
  {
    title: 'Plastic Bag Ban',
    topic: 'Environment & Nature',
    prompt: 'Some provinces and cities have banned single-use plastic bags in stores. Supporters say it reduces pollution, while some shoppers find it inconvenient and say the alternatives are not much better. Should single-use plastic bags be banned everywhere? Explain your reasons.',
  },
  {
    title: 'Urban Transit Priority',
    topic: 'Travel & Transport',
    prompt: 'Some cities are turning car lanes into bus-only and bike lanes to encourage people to use public transit. Drivers complain that this causes more traffic. Should cities give public transit priority over cars on busy streets? Explain your reasons.',
  },
  {
    title: 'Permanent Telecommuting Option',
    topic: 'Work & Career',
    prompt: 'Many employees worked from home during the pandemic, and some companies now want everyone back in the office. Should employees whose jobs can be done remotely have the right to work from home permanently? Explain your reasons.',
  },
  {
    title: 'Pet Ownership Licences',
    topic: 'Community & Services',
    prompt: 'Some people buy pets without understanding how much care they need, and many animals end up abandoned. Some people think new owners should have to pass a short course and get a licence before they can own a pet. Is this a good idea? Explain your reasons.',
  },
  {
    title: 'Expectant Parent Classes',
    topic: 'Family & Friends',
    prompt: 'Classes for expectant parents teach topics such as childbirth, feeding and baby safety. Some people think these classes should be free and required for all first-time parents. Should expectant parent classes be mandatory? Explain your reasons.',
  },
  {
    title: 'Universal Language Curriculum',
    topic: 'Education & Learning',
    prompt: 'In Canada, English and French are the two official languages, but many students graduate speaking only one of them. Some people think every student should be required to study both official languages until the end of high school. Do you agree? Explain your reasons.',
  },
  {
    title: 'Employee Mental Health Days',
    topic: 'Work & Career',
    prompt: 'Some companies give employees a few "mental health days" each year that they can take off without a doctor\'s note or explanation. Others worry that people will misuse them. Should all employers offer mental health days? Explain your reasons.',
  },
  {
    title: 'Digital Detox Days',
    topic: 'Technology & Online',
    prompt: 'Some schools and communities have started holding "digital detox days", when people are encouraged to turn off their phones and screens for a whole day. Are digital detox days a good idea? Explain your reasons.',
  },
  {
    title: 'Fast Fashion Regulations',
    topic: 'Environment & Nature',
    prompt: 'Cheap "fast fashion" clothing is designed to be worn only a few times and creates huge amounts of textile waste. Some people think the government should tax or limit fast fashion companies. Should fast fashion be more strictly regulated? Explain your reasons.',
  },
  {
    title: 'Compressed School Schedule',
    topic: 'Education & Learning',
    prompt: 'Some school boards are considering adding one extra hour to each school day so that the school year can finish a month earlier. Supporters say families would have a longer summer, while others worry students would be too tired to learn. Is this a good idea? Explain your reasons.',
  },
  {
    title: 'Organic Farming Subsidies',
    topic: 'Environment & Nature',
    prompt: 'Organic food is usually more expensive than regular food because it costs more to produce. Some people think the government should give money to organic farmers so that organic food becomes cheaper. Should the government subsidise organic farming? Explain your reasons.',
  },
  {
    title: 'Four-Day School Week',
    topic: 'Education & Learning',
    prompt: 'Some school districts have moved to a four-day school week with longer school days, saying it saves money and improves attendance. Working parents worry about finding childcare on the fifth day. Should schools switch to a four-day week? Explain your reasons.',
  },
  {
    title: 'Influencer Marketing Rules',
    topic: 'Technology & Online',
    prompt: 'Social media influencers are often paid to promote products, but their followers do not always know it is an advertisement. Some people think influencers should face fines if they do not clearly label paid posts. Should there be stricter rules for influencer marketing? Explain your reasons.',
  },
  {
    title: 'Carbon Emission Taxes',
    topic: 'Environment & Nature',
    prompt: 'Some governments charge a carbon tax on fuel and energy to encourage people and companies to reduce pollution. Critics say it makes everyday life more expensive, especially for families who need to drive. Is a carbon tax a good way to fight climate change? Explain your reasons.',
  },
  {
    title: 'Enforced Citizen Voting',
    topic: 'Community & Services',
    prompt: 'Voter turnout in some elections is below 50%. Some people suggest that citizens who do not vote without a good reason should pay a small fine. Should people be fined for not voting? Explain your reasons.',
  },
  {
    title: 'Civic Service Obligation',
    topic: 'Community & Services',
    prompt: 'Some countries require young adults to spend a year doing community service, such as helping in hospitals, parks or schools. Supporters say it builds responsibility, while others say it delays education and careers. Should young people be required to complete a year of civic service? Explain your reasons.',
  },
  {
    title: 'Post-Secondary Gap Year',
    topic: 'Education & Learning',
    prompt: 'Some students take a "gap year" after high school to work, travel or volunteer before starting college or university. Others go straight to school so they do not lose their study habits. Is taking a gap year a good idea? Explain your reasons.',
  },
  {
    title: 'High School Money Classes',
    topic: 'Education & Learning',
    prompt: 'Many young people leave high school without knowing how to budget, pay taxes or use credit cards responsibly. Some people think every high school should teach a required course on managing money. Should financial education be mandatory in high school? Explain your reasons.',
  },
  {
    title: 'Extreme Sports Ban',
    topic: 'Leisure & Culture',
    prompt: 'Extreme sports such as base jumping, free climbing and backcountry skiing can lead to serious injuries, and rescue and hospital costs are often paid by the public. Should dangerous extreme sports be banned or restricted? Explain your reasons.',
  },
  {
    title: 'Universal Healthcare Systems',
    topic: 'Health & Wellness',
    prompt: 'Canada\'s public healthcare system pays for doctor visits and hospital care, but many people still pay for dental care, eye care and prescriptions themselves. Should public healthcare be expanded to cover these services too, even if it means higher taxes? Explain your reasons.',
  },
  {
    title: 'Cryptocurrency Regulations',
    topic: 'Money & Shopping',
    prompt: 'Cryptocurrencies such as Bitcoin have become popular investments, but many people have lost money to scams and sudden price drops. Some people think the government should strictly regulate cryptocurrency, just like banks. Do you agree? Explain your reasons.',
  },
  {
    title: 'Space Exploration Funding',
    topic: 'Technology & Online',
    prompt: 'Governments spend billions of dollars on space exploration, such as missions to the Moon and Mars. Some people think this money would be better spent solving problems on Earth, like poverty and healthcare. Should governments continue to fund space exploration? Explain your reasons.',
  },
  {
    title: 'Phasing Out Zoos',
    topic: 'Environment & Nature',
    prompt: 'Zoos say they protect endangered species and teach people about animals. Critics say keeping wild animals in enclosures is cruel. Should zoos be slowly phased out? Explain your reasons.',
  },
  {
    title: 'Guaranteed Basic Income',
    topic: 'Money & Shopping',
    prompt: 'A universal basic income would give every adult the same monthly payment from the government, no matter how much they earn, and replace some existing benefit programs. Is a guaranteed basic income for everyone a good idea? Explain your reasons.',
  },
  {
    title: 'Backyard Clothesline Ban',
    topic: 'Home & Housing',
    prompt: 'Some neighbourhoods and condo associations do not allow residents to hang laundry outside, saying it looks untidy and lowers property values. Others say clotheslines save energy and money. Should neighbourhoods be allowed to ban backyard clotheslines? Explain your reasons.',
  },
  {
    title: 'Electric Car Subsidies',
    topic: 'Travel & Transport',
    prompt: 'Many governments give buyers thousands of dollars in rebates when they purchase an electric car. Critics say this money mostly helps wealthier people who can already afford new cars. Should governments continue to subsidise electric cars? Explain your reasons.',
  },
  {
    title: 'Energy Drink Age Limit',
    topic: 'Health & Wellness',
    prompt: 'Energy drinks contain large amounts of caffeine and sugar, and some doctors warn they are harmful to teenagers. Some countries have banned their sale to anyone under 16. Should there be a minimum age to buy energy drinks? Explain your reasons.',
  },
];
