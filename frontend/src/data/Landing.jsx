import {
  Bike,
  CreditCard,
  BarChart3,
  PieChart,
  MapIcon,
  BadgeDollarSign,
  BadgeCheck,
  ClockIcon,
  Shapes,
} from "lucide-react";

export const statsData = [
  {
    value: "10K+",
    label: "Happy Riders",
  },
  {
    value: "4k+",
    label: "Bikes Rented & Sold",
  },
  {
    value: "99.9%",
    label: "Uptime",
  },
  {
    value: "4.8/5",
    label: "Customer Satisfaction",
  },
];

export const featuresData = [
  {
    icon: <Bike className="h-8 w-8 text-green-600" />,
    title: "Buy Bikes",
    description:
      "Browse and purchase bikes from a wide variety of styles and models, all in one place.",
  },

  {
    icon: <Shapes className="h-8 w-8 text-blue-600" />,
    title: "Bike Rentals",
    description:
      "Rent bikes for a short term, whether for a few hours or a few days, at flexible prices.",
  },
  {
    icon: <MapIcon className="h-8 w-8 text-yellow-600" />,
    title: "Location-based Rental Finder",
    description:
      "Find available bikes near your location with our interactive map feature.",
  },
  {
    icon: <BadgeDollarSign className="h-8 w-8 text-purple-600" />,
    title: "Secure Payment",
    description:
      "Complete your purchase or rental with secure, hassle-free payment options.",
  },
  {
    icon: <BadgeCheck className="h-8 w-8 text-red-600" />,
    title: "Bike Condition Guarantee",
    description:
      "All bikes are inspected and guaranteed to be in excellent condition for your safety and enjoyment.",
  },
  {
    icon: <ClockIcon className="h-8 w-8 text-teal-600" />,
    title: "Flexible Rental Duration",
    description:
      "Rent a bike for the duration that suits you, with options for hourly, daily, and weekly rentals.",
  },
];

export const howItWorksData = [
  {
    icon: <CreditCard className="h-8 w-8 text-[#5753E8]" />,
    title: "1. Browse Bikes for Sale",
    description:
      "Explore a wide selection of bikes available for purchase based on your preferences and budget.",
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-[#5753E8]" />,
    title: "2. Rent a Bike",
    description:
      "Easily rent bikes for a few days or months from our location-based rentals. Convenient and flexible and affordable!",
  },
  {
    icon: <PieChart className="h-8 w-8 text-[#5753E8]" />,
    title: "3.Secure Payment",
    description:
      "Whether you're buying or renting, our platform ensures a  secure payment process.",
  },
];

// Testimonials Data
export const testimonialsData = [
  {
    name: "Sarah Johnson",
    role: "Bike Enthusiast",
    image: "https://randomuser.me/api/portraits/women/75.jpg",
    quote:
      "Reeliic made it so easy to rent a bike while traveling. The entire process was smooth, and the bike was in top-notch condition!",
  },
  {
    name: "Michael Chen",
    role: "Weekend Rider",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    quote:
      "I’ve used Reeliic to both rent and buy bikes — it's incredibly convenient and user-friendly. I love how transparent the pricing is.",
  },
  {
    name: "Emily Rodriguez",
    role: "Delivery Partner",
    image: "https://randomuser.me/api/portraits/women/74.jpg",
    quote:
      "Reeliic helped me get a reliable bike for my delivery work. Their support team is amazing and the rental plans are flexible and affordable.",
  },
];
