import { Container } from "@/components/ui/container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shirt, 
  Sparkles, 
  Zap, 
  Heart, 
  Shield, 
  Clock, 
  Truck,
  Star,
  CheckCircle
} from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      id: "wash-fold",
      icon: Shirt,
      title: "Wash & Fold",
      description: "Complete washing, drying, and folding service for everyday clothes",
      features: [
        "Professional washing with premium detergents",
        "Proper drying and temperature control",
        "Neat folding and packaging",
        "Same-day service available",
        "Eco-friendly cleaning products"
      ],
      pricing: "Starting from ৳20 per piece",
      turnaround: "24-48 hours",
      popular: false,
    },
    {
      id: "dry-cleaning",
      icon: Sparkles,
      title: "Dry Cleaning",
      description: "Specialized dry cleaning for delicate and formal garments",
      features: [
        "Suits and formal wear specialist",
        "Delicate fabric handling",
        "Professional stain removal",
        "Expert pressing and finishing",
        "Garment protection and care"
      ],
      pricing: "Starting from ৳150 per piece",
      turnaround: "48-72 hours",
      popular: true,
    },
    {
      id: "express",
      icon: Zap,
      title: "Express Service",
      description: "Fast turnaround for urgent laundry needs",
      features: [
        "Same-day pickup and delivery",
        "Priority processing",
        "Express washing and drying",
        "Quick turnaround guarantee",
        "Emergency service available"
      ],
      pricing: "Standard rates + 50% express fee",
      turnaround: "Same day or 24 hours",
      popular: false,
    },
    {
      id: "premium",
      icon: Heart,
      title: "Premium Care",
      description: "Special treatment for your most valued garments",
      features: [
        "Hand washing for delicate items",
        "Premium fabric conditioning",
        "Custom packaging and presentation",
        "White glove pickup and delivery",
        "Personalized care instructions"
      ],
      pricing: "Starting from ৳300 per piece",
      turnaround: "3-5 days",
      popular: false,
    },
    {
      id: "alterations",
      icon: Shield,
      title: "Alterations & Repairs",
      description: "Professional tailoring and garment repair services",
      features: [
        "Hemming and fitting adjustments",
        "Button and zipper replacement",
        "Tear and hole repairs",
        "Size alterations",
        "Professional tailoring"
      ],
      pricing: "Custom pricing based on work",
      turnaround: "3-7 days",
      popular: false,
    },
    {
      id: "subscription",
      icon: Star,
      title: "Subscription Service",
      description: "Regular laundry service with exclusive benefits",
      features: [
        "Weekly or bi-weekly pickup",
        "Priority scheduling",
        "Discounted rates",
        "Free pickup and delivery",
        "Loyalty rewards and points"
      ],
      pricing: "Custom plans from ৳2000/month",
      turnaround: "Regular schedule",
      popular: true,
    },
  ];

  const additionalServices = [
    {
      title: "Free Pickup & Delivery",
      description: "Convenient doorstep service at no extra cost",
      icon: Truck,
    },
    {
      title: "24/7 Customer Support",
      description: "Round-the-clock assistance for all your needs",
      icon: Clock,
    },
    {
      title: "Quality Guarantee",
      description: "100% satisfaction guarantee on all services",
      icon: Shield,
    },
    {
      title: "Eco-Friendly Products",
      description: "Safe and environmentally conscious cleaning",
      icon: Heart,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <Container>
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
              Our <span className="text-blue-600">Services</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive laundry solutions designed to keep your clothes fresh, 
              clean, and perfectly cared for. Choose from our range of professional services.
            </p>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <Card key={service.id} className="relative hover:shadow-lg transition-shadow">
                  {service.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-orange-500 hover:bg-orange-600">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <IconComponent className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="space-y-2 pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Pricing:</span>
                        <span className="font-semibold text-blue-600">{service.pricing}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Turnaround:</span>
                        <span className="font-semibold">{service.turnaround}</span>
                      </div>
                    </div>

                    <Button className="w-full" asChild>
                      <Link href="/register">
                        Get Started
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Why Choose Dhopa Lagbe?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We go above and beyond to provide exceptional service and convenience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <IconComponent className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <Container>
          <div className="text-center space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Experience Premium Laundry Care?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us with their laundry
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
                <Link href="/register">
                  Start Your Order
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-blue-600" 
                asChild
              >
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}