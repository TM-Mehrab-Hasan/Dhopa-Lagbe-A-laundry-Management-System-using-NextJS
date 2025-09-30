import { Container } from "@/components/ui/container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Star, 
  Clock, 
  Truck,
  Shield,
  Phone
} from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const washFoldPricing = [
    { item: "T-Shirt", price: 25 },
    { item: "Shirt (Formal)", price: 35 },
    { item: "Pants/Trousers", price: 40 },
    { item: "Jeans", price: 45 },
    { item: "Dress (Simple)", price: 60 },
    { item: "Dress (Designer)", price: 100 },
    { item: "Sweater/Cardigan", price: 80 },
    { item: "Jacket", price: 120 },
    { item: "Bedsheet (Single)", price: 80 },
    { item: "Bedsheet (Double)", price: 120 },
  ];

  const dryCleaningPricing = [
    { item: "Suit (2-piece)", price: 350 },
    { item: "Suit (3-piece)", price: 450 },
    { item: "Blazer", price: 200 },
    { item: "Formal Dress", price: 250 },
    { item: "Wedding Dress", price: 800 },
    { item: "Silk Garments", price: 300 },
    { item: "Leather Jacket", price: 600 },
    { item: "Overcoat", price: 400 },
    { item: "Curtains (per panel)", price: 150 },
    { item: "Comforter", price: 300 },
  ];

  const subscriptionPlans = [
    {
      name: "Basic",
      price: 2000,
      description: "Perfect for small families",
      features: [
        "15 pieces per month",
        "Regular wash & fold",
        "Free pickup & delivery",
        "48-hour turnaround",
        "Basic customer support"
      ],
      popular: false,
    },
    {
      name: "Standard",
      price: 3500,
      description: "Most popular for medium families",
      features: [
        "30 pieces per month",
        "Wash & fold + 3 dry clean items",
        "Free pickup & delivery",
        "24-48 hour turnaround",
        "Priority customer support",
        "10% loyalty points bonus"
      ],
      popular: true,
    },
    {
      name: "Premium",
      price: 5500,
      description: "Comprehensive care for large families",
      features: [
        "50 pieces per month",
        "All services included",
        "Free pickup & delivery",
        "Same-day service available",
        "24/7 priority support",
        "20% loyalty points bonus",
        "Free stain protection",
        "Wardrobe consultation"
      ],
      popular: false,
    },
  ];

  const additionalServices = [
    { service: "Express Service (same-day)", fee: "+50% of base price" },
    { service: "Stain Removal (special)", fee: "৳50-150 per stain" },
    { service: "Fabric Protection", fee: "৳30 per piece" },
    { service: "Garment Alteration", fee: "৳100-500 per piece" },
    { service: "Emergency Pickup", fee: "৳100 extra" },
    { service: "Weekend Delivery", fee: "৳50 extra" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <Container>
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
              Transparent <span className="text-blue-600">Pricing</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quality laundry services at affordable prices. No hidden fees, 
              no surprises - just honest, upfront pricing for all our services.
            </p>
          </div>
        </Container>
      </section>

      {/* Pricing Tables */}
      <section className="py-16">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Wash & Fold Pricing */}
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Wash & Fold</CardTitle>
                <CardDescription>
                  Regular laundry service pricing per piece
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {washFoldPricing.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-gray-700">{item.item}</span>
                      <span className="font-semibold text-blue-600">৳{item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Minimum order:</strong> ৳200 or 5 pieces
                  </p>
                  <p className="text-sm text-blue-800">
                    <strong>Turnaround:</strong> 24-48 hours
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Dry Cleaning Pricing */}
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Dry Cleaning</CardTitle>
                <CardDescription>
                  Professional dry cleaning service pricing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dryCleaningPricing.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-gray-700">{item.item}</span>
                      <span className="font-semibold text-blue-600">৳{item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Minimum order:</strong> ৳300 or 2 pieces
                  </p>
                  <p className="text-sm text-blue-800">
                    <strong>Turnaround:</strong> 48-72 hours
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Subscription Plans */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Subscription Plans
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Save money with our monthly subscription plans. Perfect for regular customers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {subscriptionPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-blue-600 shadow-lg' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-orange-500 hover:bg-orange-600">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-blue-600">
                      ৳{plan.price}
                      <span className="text-lg text-gray-600 font-normal">/month</span>
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    asChild
                  >
                    <Link href="/register">
                      Choose {plan.name}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              All subscription plans include free pickup and delivery within Dhaka city.
            </p>
            <p className="text-gray-600">
              Cancel or modify your plan anytime with 30 days notice.
            </p>
          </div>
        </Container>
      </section>

      {/* Additional Services */}
      <section className="py-16">
        <Container>
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Additional Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Extra services to enhance your laundry experience
            </p>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="space-y-4">
                {additionalServices.map((service, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                    <span className="text-gray-700 font-medium">{service.service}</span>
                    <span className="text-blue-600 font-semibold">{service.fee}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </Container>
      </section>

      {/* Service Features */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              What's Included
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every service comes with these benefits at no extra cost
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Truck,
                title: "Free Pickup & Delivery",
                description: "Within Dhaka city limits"
              },
              {
                icon: Shield,
                title: "100% Quality Guarantee",
                description: "Satisfaction guaranteed or redo free"
              },
              {
                icon: Clock,
                title: "On-Time Delivery",
                description: "Reliable scheduling you can count on"
              },
              {
                icon: Phone,
                title: "24/7 Support",
                description: "Round-the-clock customer assistance"
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <IconComponent className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Choose the service that's right for you and experience the difference
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
                  Get Custom Quote
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}