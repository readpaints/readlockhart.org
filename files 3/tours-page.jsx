import React, { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

const ToursPage = () => {
  // Formspree hook for booking form
  const [bookingState, handleBookingSubmit] = useForm('xrededzd');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '2',
    museum: 'prado',
    date: '',
    time: '',
    interests: [],
    notes: '',
    ticketAssistance: 'no'
  });

  const [testimonials, setTestimonials] = useState([]);

  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    location: '',
    text: ''
  });

  const [testimonialSubmitted, setTestimonialSubmitted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [expandedTour, setExpandedTour] = useState(null);

  const museums = [
    { id: 'prado', label: 'The Prado Through a Painter\'s Eyes' },
    { id: 'reina', label: 'Guernica and Modernity at Reina Sofía' },
    { id: 'thyssen', label: 'How Painting Changed the Way We See — at Thyssen-Bornemisza' }
  ];

  const interests = [
    'Old Masters',
    'Velázquez',
    'Goya',
    'Modern Art',
    'Painting Technique',
    'Spanish History',
    'Family-Friendly',
    'Color & Light'
  ];

  // Generate available dates (next 3 months, excluding booked dates and adjacent days)
  const generateAvailableDates = () => {
    const today = new Date();
    const dates = [];
    
    for (let i = 1; i < 90; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      
      // Skip Sundays and Mondays (museums closed/low traffic)
      const day = date.getDay();
      if (day !== 0 && day !== 1) {
        dates.push(date);
      }
    }
    
    return dates;
  };

  const availableDates = useMemo(() => generateAvailableDates(), []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleInterest = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleBookingFormSubmit = async (e) => {
    e.preventDefault();
    
    // Format interests array as comma-separated string for email
    const formDataToSubmit = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      guests: formData.guests,
      museum: formData.museum,
      date: formData.date,
      time: formData.time,
      interests: formData.interests.join(', ') || 'Not specified',
      ticketAssistance: formData.ticketAssistance,
      notes: formData.notes
    };

    // Create a temporary form element for Formspree
    const tempForm = document.createElement('form');
    Object.keys(formDataToSubmit).forEach(key => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = formDataToSubmit[key];
      tempForm.appendChild(input);
    });

    // Submit using Formspree
    try {
      const response = await fetch('https://formspree.io/f/xrededzd', {
        method: 'POST',
        body: new FormData(tempForm),
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Success - show message and reset form
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            guests: '2',
            museum: 'prado',
            date: '',
            time: '',
            interests: [],
            notes: '',
            ticketAssistance: 'no'
          });
        }, 3000);
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleTestimonialChange = (e) => {
    const { name, value } = e.target;
    setNewTestimonial(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTestimonialSubmit = (e) => {
    e.preventDefault();
    
    if (newTestimonial.name && newTestimonial.text) {
      const newTest = {
        id: Date.now(),
        name: newTestimonial.name,
        location: newTestimonial.location,
        text: newTestimonial.text,
        featured: false
      };
      
      setTestimonials([...testimonials, newTest]);
      setNewTestimonial({ name: '', location: '', text: '' });
      setTestimonialSubmitted(true);
      
      setTimeout(() => setTestimonialSubmitted(false), 3000);
      
      // In production, send this to your backend
      console.log('New testimonial:', newTest);
    }
  };

  const tours = [
    {
      id: 'prado',
      title: 'The Prado Through a Painter\'s Eyes',
      duration: '2 to 2.5 hours',
      theme: 'How painting evolved from symbol into living perception',
      description: 'Your flagship experience. The Prado can overwhelm—endless galleries, masterpieces competing for attention. We slow it down. A curated journey through Bosch, Titian, Rubens, El Greco, Velázquez, Goya, and others. We explore not just what these paintings mean, but how they *work*: color fighting under thin paint, edges that dissolve or hold firm, compositional rhythms that pull your eye. The decisions that separate masterpieces from the forgettable.',
      works: ['Titian', 'Rubens', 'El Greco', 'Caravaggio', 'Velázquez', 'Goya', 'Spanish Masters']
    },
    {
      id: 'reina',
      title: 'Guernica and Modernity',
      duration: '60 to 90 minutes',
      theme: 'War, fragmentation, modernism, and how visual language transformed',
      description: 'Sharper. Smaller. Emotionally concentrated. Guernica hits differently in person—the scale, the intensity, the raw response. We sit with it, along with selected modern works, exploring how painters responded to 20th-century fracture. Why abstraction happened. What modernism cost. How vision itself *changed*.',
      works: ['Picasso', 'Modernist Masters', 'Spanish Modernism']
    },
    {
      id: 'thyssen',
      title: 'How Painting Changed the Way We See',
      duration: '2 to 2.5 hours',
      theme: 'A walk through centuries—from devotional objects to postwar abstraction',
      description: 'The Thyssen reads almost like a visual history book, told through centuries of paint. Early devotional gold leaf to Venetian color flooding the canvas, Dutch light becoming introspective, Impressionist moments caught mid-breath, abstraction breaking form open, postwar artists rebuilding meaning from fragments. Time travel through how humans learned to see.',
      works: ['Early Renaissance', 'Venetian Masters', 'Dutch Light', 'Impressionism', 'Abstraction', 'Postwar Art']
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 md:py-28">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-normal mb-6 leading-tight tracking-tight">
            Private Museum Tours in Madrid
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-light mb-8 leading-relaxed">
            See the Prado, Reina Sofía, and Thyssen-Bornemisza through the eyes of a working artist.
          </p>
          <div className="w-16 h-px bg-gray-400 mx-auto"></div>
        </div>

        {/* About Read - Early Credibility */}
        <div className="max-w-3xl mx-auto mb-20 bg-gray-50 p-10 border border-gray-200">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            I'm a professional painter and former university art instructor living in Madrid. I have an MFA in Painting from the Pennsylvania Academy of the Fine Arts, and I've spent years studying, teaching, and returning to these great collections. 
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            These tours emerged naturally from that practice. My goal isn't to explain paintings historically, but to help you truly see them—the way a painter sees. Color, edge, composition, the decisions that separate masterpieces from the merely accomplished. You'll discover what most guides never mention.
          </p>
        </div>

        {/* Core Concept */}
        <div className="max-w-3xl mx-auto mb-20">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            The Prado can overwhelm even experienced visitors. These tours slow the museum down. We spend time with a few paintings rather than racing past hundreds. Each visit combines rigorous art history with the perspective of a practicing painter—something you won't find in standard museum guides.
          </p>
          <p className="text-gray-600 text-center italic">
            Ideal for curious travelers, artists, collectors, students, couples, and anyone who wants a deeper encounter with great paintings.
          </p>
        </div>
      </section>

      {/* Tour Options */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-normal mb-16 text-center">Three Experiences</h2>
          
          <div className="space-y-8">
            {tours.map((tour) => (
              <div
                key={tour.id}
                className="bg-white border border-gray-200 hover:shadow-md transition-shadow duration-300"
              >
                <button
                  onClick={() => setExpandedTour(expandedTour === tour.id ? null : tour.id)}
                  className="w-full px-8 py-8 text-left flex justify-between items-start hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="text-2xl font-normal mb-3">{tour.title}</h3>
                    <p className="text-gray-600 mb-2 text-base">{tour.duration}</p>
                    <p className="text-gray-500 italic text-sm">{tour.theme}</p>
                  </div>
                  <ChevronDown
                    size={24}
                    className={`text-gray-400 mt-2 flex-shrink-0 ml-4 transition-transform ${
                      expandedTour === tour.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {expandedTour === tour.id && (
                  <div className="px-8 py-8 border-t border-gray-100 bg-gray-50">
                    <p className="text-gray-700 leading-relaxed mb-6">{tour.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {tour.works.map((work) => (
                        <span
                          key={work}
                          className="px-4 py-2 bg-white border border-gray-300 text-sm text-gray-700 rounded"
                        >
                          {work}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes This Different */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-normal mb-12 text-center">What Makes These Tours Different?</h2>
        
        <div className="max-w-2xl mx-auto">
          <div className="space-y-4 text-lg text-gray-700">
            <div className="flex items-start">
              <span className="text-gray-400 mr-4 mt-1">•</span>
              <span><span className="font-normal text-gray-900">Small groups only.</span> Conversation scale, not cattle herds.</span>
            </div>
            <div className="flex items-start">
              <span className="text-gray-400 mr-4 mt-1">•</span>
              <span><span className="font-normal text-gray-900">Responsive, conversational format.</span> Not a script. If something moves you, we linger.</span>
            </div>
            <div className="flex items-start">
              <span className="text-gray-400 mr-4 mt-1">•</span>
              <span><span className="font-normal text-gray-900">Focus on how paintings actually work.</span> Color, edge, composition, the decisions painters make.</span>
            </div>
            <div className="flex items-start">
              <span className="text-gray-400 mr-4 mt-1">•</span>
              <span><span className="font-normal text-gray-900">Led by a practicing painter.</span> Not a scholar reciting facts, but someone actively wrestling with art.</span>
            </div>
            <div className="flex items-start">
              <span className="text-gray-400 mr-4 mt-1">•</span>
              <span><span className="font-normal text-gray-900">Designed for curiosity, not checklist tourism.</span> We care about what you see, not how many paintings we cover.</span>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-normal mb-4 text-center">Pricing</h2>
        <p className="text-center text-gray-600 mb-16 text-lg">
          Straightforward rates for each museum. Groups of one to five.
        </p>
        
        <div className="space-y-12">
          {/* Prado */}
          <div>
            <h3 className="text-xl font-normal mb-6 text-gray-900">The Prado Through a Painter's Eyes</h3>
            <div className="bg-white p-8 border border-gray-200">
              <div className="space-y-3">
                <div className="flex justify-between items-baseline pb-3 border-b border-gray-100">
                  <span className="text-gray-700">One guest</span>
                  <span className="text-gray-900 font-normal">€140</span>
                </div>
                <div className="flex justify-between items-baseline pb-3 border-b border-gray-100">
                  <span className="text-gray-700">Two guests</span>
                  <span className="text-gray-900 font-normal">€220</span>
                </div>
                <div className="flex justify-between items-baseline pb-3 border-b border-gray-100">
                  <span className="text-gray-700">Three guests</span>
                  <span className="text-gray-900 font-normal">€300</span>
                </div>
                <div className="flex justify-between items-baseline pb-3 border-b border-gray-100">
                  <span className="text-gray-700">Four guests</span>
                  <span className="text-gray-900 font-normal">€360</span>
                </div>
                <div className="flex justify-between items-baseline pt-2">
                  <span className="text-gray-700">Five guests</span>
                  <span className="text-gray-900 font-normal">€400</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-6">
                2 to 2.5 hours — flexible and responsive to your pace. Tours won't be shortened unless you prefer, and may extend if questions, insights, and energy allow.
              </p>
            </div>
          </div>

          {/* Reina Sofía */}
          <div>
            <h3 className="text-xl font-normal mb-6 text-gray-900">Guernica and Modernity at Reina Sofía</h3>
            <div className="bg-white p-8 border border-gray-200">
              <div className="space-y-3">
                <div className="flex justify-between items-baseline pb-3 border-b border-gray-100">
                  <span className="text-gray-700">One guest</span>
                  <span className="text-gray-900 font-normal">€100</span>
                </div>
                <div className="flex justify-between items-baseline pb-3 border-b border-gray-100">
                  <span className="text-gray-700">Two guests</span>
                  <span className="text-gray-900 font-normal">€160</span>
                </div>
                <div className="flex justify-between items-baseline pb-3 border-b border-gray-100">
                  <span className="text-gray-700">Three guests</span>
                  <span className="text-gray-900 font-normal">€220</span>
                </div>
                <div className="flex justify-between items-baseline pb-3 border-b border-gray-100">
                  <span className="text-gray-700">Four guests</span>
                  <span className="text-gray-900 font-normal">€280</span>
                </div>
                <div className="flex justify-between items-baseline pt-2">
                  <span className="text-gray-700">Five guests</span>
                  <span className="text-gray-900 font-normal">€320</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-6">
                60 to 90 minutes — flexible and responsive to your pace. Guernica is emotionally concentrated; timing depends on how deeply you want to go.
              </p>
            </div>
          </div>

          {/* Thyssen */}
          <div>
            <h3 className="text-xl font-normal mb-6 text-gray-900">How Painting Changed the Way We See</h3>
            <p className="text-gray-600 mb-6 text-sm italic">
              At the Thyssen-Bornemisza Museum. A walk through centuries of how vision itself evolved.
            </p>
            <div className="bg-white p-8 border border-gray-200">
              <div className="space-y-3">
                <div className="flex justify-between items-baseline pb-3 border-b border-gray-100">
                  <span className="text-gray-700">One guest</span>
                  <span className="text-gray-900 font-normal">€140</span>
                </div>
                <div className="flex justify-between items-baseline pb-3 border-b border-gray-100">
                  <span className="text-gray-700">Two guests</span>
                  <span className="text-gray-900 font-normal">€220</span>
                </div>
                <div className="flex justify-between items-baseline pb-3 border-b border-gray-100">
                  <span className="text-gray-700">Three guests</span>
                  <span className="text-gray-900 font-normal">€300</span>
                </div>
                <div className="flex justify-between items-baseline pb-3 border-b border-gray-100">
                  <span className="text-gray-700">Four guests</span>
                  <span className="text-gray-900 font-normal">€360</span>
                </div>
                <div className="flex justify-between items-baseline pt-2">
                  <span className="text-gray-700">Five guests</span>
                  <span className="text-gray-900 font-normal">€400</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-6">
                2 to 2.5 hours — flexible and responsive to your pace. Tours won't be shortened unless you prefer, and may extend if questions, insights, and energy allow.
              </p>
            </div>
          </div>

          {/* Add-ons */}
          <div>
            <h3 className="text-xl font-normal mb-6 text-gray-900">Curated Endings & Extensions</h3>
            <div className="bg-white p-8 border border-gray-200">
              <p className="text-gray-600 mb-8 leading-relaxed">
                Tours can extend into something more memorable. These aren't afterthoughts—they're designed to deepen the experience and extend the conversation.
              </p>
              <div className="space-y-6">
                <div className="pb-6 border-b border-gray-100">
                  <h4 className="text-gray-900 font-normal mb-2">Wine & Conversation</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Vermouth, wine, or cava at a thoughtfully chosen local bar (never tourist traps). The museum conversation continues in a different light.
                  </p>
                  <p className="text-gray-900 font-normal">€35 per person</p>
                </div>
                <div className="pb-6 border-b border-gray-100">
                  <h4 className="text-gray-900 font-normal mb-2">Looking & Drawing</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    After the museum, we find a quiet spot. I teach you to observe like a painter—not to "make art," but to truly see. Sketchbooks and materials provided.
                  </p>
                  <p className="text-gray-900 font-normal">€50 per person</p>
                </div>
                <div className="pb-6 border-b border-gray-100">
                  <h4 className="text-gray-900 font-normal mb-2">Retiro Walk & Reflection</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Walking through the park near my studio, we talk about what we saw and what it means. The city becomes part of the conversation.
                  </p>
                  <p className="text-gray-900 font-normal">€30 per person</p>
                </div>
                <div>
                  <h4 className="text-gray-900 font-normal mb-2">Group Photography</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Professional photography by my wife Kristel, a trained photographer. Beautiful portraits of your group in the museum setting and around Madrid. Digital files provided.
                  </p>
                  <p className="text-gray-900 font-normal">€80 (up to 5 people)</p>
                </div>
                <div>
                  <h4 className="text-gray-900 font-normal mb-2">Custom Experiences</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Have something else in mind? Studio visit, specific neighborhood focus, or combination of the above. Ask in your inquiry.
                  </p>
                  <p className="text-gray-900 font-normal">Price on request</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 p-8 bg-gray-50 border border-gray-200">
          <p className="text-gray-700 text-center leading-relaxed">
            Museum entry tickets are separate. Plan on €5–15 per museum depending on the day and whether you qualify for discounts. I'll coordinate timing with you so everything flows smoothly. If you have questions about access or pricing, just ask in your inquiry.
          </p>
        </div>
      </section>

      {/* Key Points */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h3 className="text-xl font-normal mb-6 text-gray-900">Private & Intimate</h3>
            <p className="text-gray-700 leading-relaxed">
              Limited availability. One private tour per day, maximum five guests. This isn't a cattle-herd through the galleries. Tours are conversational, adaptive, and responsive to the energy and interests of your group.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-normal mb-6 text-gray-900">Curator, Not Docent</h3>
            <p className="text-gray-700 leading-relaxed">
              Not a script. Each visit is alive and present. If I'm not feeling El Greco that day, we acknowledge it. If a painting moves you, we sit with it. The experience is curated but never canned.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-normal mb-6 text-gray-900">The Painter's Eye</h3>
            <p className="text-gray-700 leading-relaxed">
              You learn how paintings actually work—edge control, lost and found form, warm and cool structure, surface, why photographs fail. These are lessons from the studio, applied to the canvas.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-normal mb-6 text-gray-900">Memorable Endings</h3>
            <p className="text-gray-700 leading-relaxed">
              Tours can optionally end with vermouth, wine, chocolate, or an informal conversation about art. We might walk through Retiro. A cultivated afternoon, not a checklist.
            </p>
          </div>
        </div>
      </section>

      {/* Language & Logistics Notice */}
      <section className="max-w-4xl mx-auto px-6 py-16 mb-8">
        <div className="max-w-2xl mx-auto bg-white p-8 border border-gray-200">
          <h3 className="text-lg font-normal mb-4 text-gray-900">Important Information</h3>
          <div className="space-y-6 text-gray-700">
            <div>
              <p className="font-normal text-gray-900 mb-2">Language</p>
              <p>Tours are currently offered in English only. I am actively learning Spanish, but at present all tours and discussions are conducted in English to ensure clarity, depth, and conversational quality.</p>
            </div>
            <div>
              <p className="font-normal text-gray-900 mb-2">Museum Admission</p>
              <p>Museum entry fees are separate from tour pricing (typically €5–15 per museum). You may purchase tickets yourself, or I can arrange them for you as described below.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-4xl font-normal mb-4 text-center">Request a Tour</h2>
          <p className="text-center text-gray-600 mb-12">Tell me about your group, preferences, and ideal timing. I'll confirm by email or WhatsApp within 48 hours.</p>

          {submitted && (
            <div className="mb-8 p-6 bg-green-50 border border-green-200 text-center">
              <p className="text-green-900 font-normal">Thank you! I'll be in touch shortly.</p>
            </div>
          )}

          <form onSubmit={handleBookingFormSubmit} className="space-y-8">
            {/* Name & Email */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-normal text-gray-700 mb-3">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-gray-600 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-normal text-gray-700 mb-3">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-gray-600 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-normal text-gray-700 mb-3">WhatsApp / Phone (optional)</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-gray-600 transition-colors"
                placeholder="+34 ..."
              />
            </div>

            {/* Museum Selection */}
            <div>
              <label className="block text-sm font-normal text-gray-700 mb-3">Which museum interests you?</label>
              <select
                name="museum"
                value={formData.museum}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-gray-600 transition-colors appearance-none cursor-pointer"
              >
                {museums.map(m => (
                  <option key={m.id} value={m.id}>{m.label}</option>
                ))}
              </select>
            </div>

            {/* Number of Guests */}
            <div>
              <label className="block text-sm font-normal text-gray-700 mb-3">Number of guests</label>
              <select
                name="guests"
                value={formData.guests}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-gray-600 transition-colors appearance-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5].map(n => (
                  <option key={n} value={n}>{n} guest{n > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>

            {/* Date & Time */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-normal text-gray-700 mb-3">Preferred date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-gray-600 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-normal text-gray-700 mb-3">Preferred time</label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-gray-600 transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Select a time</option>
                  <option value="9:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                </select>
              </div>
            </div>

            {/* Ticket Assistance */}
            <div>
              <label className="block text-sm font-normal text-gray-700 mb-3">Would you like assistance arranging museum tickets?</label>
              <select
                name="ticketAssistance"
                value={formData.ticketAssistance}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-gray-600 transition-colors appearance-none cursor-pointer"
              >
                <option value="no">No, I will purchase tickets myself</option>
                <option value="yes">Yes, please arrange tickets for my group</option>
              </select>
              <p className="text-xs text-gray-600 mt-2">
                Ticket coordination is €7 per person (museum admission not included). Requests require at least 48 hours' notice and are subject to museum availability.
              </p>
            </div>

            {/* Interests */}
            <div>
              <label className="block text-sm font-normal text-gray-700 mb-4">What interests you? (select any)</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {interests.map(interest => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-4 py-2 text-sm border transition-colors ${
                      formData.interests.includes(interest)
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-600'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-normal text-gray-700 mb-3">Notes or questions</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-gray-600 transition-colors resize-none"
                placeholder="Tell me about your group, what you're hoping to experience, or any special interests..."
              />
            </div>

            {/* Submit */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-gray-900 text-white px-8 py-4 text-base font-normal hover:bg-gray-800 transition-colors duration-300"
              >
                Request a Tour
              </button>
              <p className="text-center text-gray-600 text-sm mt-4">
                I'll confirm availability within 48 hours.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-4xl font-normal mb-4 text-center">Share Your Experience</h2>
          <p className="text-center text-gray-600 mb-12">
            Have you been on one of my tours? I'd love to hear what it meant to you. Your honest reflection helps others understand what to expect, and it matters to me.
          </p>

          {testimonialSubmitted && (
            <div className="mb-8 p-6 bg-green-50 border border-green-200 text-center">
              <p className="text-green-900 font-normal">Thank you. Your reflection has been added to the page.</p>
            </div>
          )}

          <div className="bg-white border border-gray-200 p-8">
            {testimonials.length > 0 && (
              <div className="mb-12 pb-12 border-b border-gray-200">
                <h3 className="text-lg font-normal mb-8 text-gray-900">Recent Guest Reflections</h3>
                <div className="space-y-8">
                  {testimonials.map(testimonial => (
                    <div key={testimonial.id}>
                      <p className="text-gray-700 leading-relaxed mb-4 italic">
                        "{testimonial.text}"
                      </p>
                      <div>
                        <p className="font-normal text-gray-900">{testimonial.name}</p>
                        {testimonial.location && (
                          <p className="text-sm text-gray-600">{testimonial.location}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <h3 className="text-lg font-normal mb-6 text-gray-900">Add Your Own</h3>
            <form onSubmit={handleTestimonialSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-2">Your name</label>
                  <input
                    type="text"
                    name="name"
                    value={newTestimonial.name}
                    onChange={handleTestimonialChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-gray-600 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-normal text-gray-700 mb-2">City / Location (optional)</label>
                  <input
                    type="text"
                    name="location"
                    value={newTestimonial.location}
                    onChange={handleTestimonialChange}
                    className="w-full px-4 py-2 border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-gray-600 transition-colors"
                    placeholder="London, Madrid, etc."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-normal text-gray-700 mb-2">What was your experience?</label>
                <textarea
                  name="text"
                  value={newTestimonial.text}
                  onChange={handleTestimonialChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-gray-600 transition-colors resize-none"
                  placeholder="What stood out? What did you learn? How did it change how you see?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gray-900 text-white px-6 py-3 text-sm font-normal hover:bg-gray-800 transition-colors duration-300"
              >
                Share Your Reflection
              </button>
            </form>
          </div>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          These tours are not for everyone. They're for people who want to slow down, see deeply, and understand why great paintings matter. For those who sense there's something beyond the placard on the wall.
        </p>
        <p className="text-gray-600 mb-8">
          Available for individuals, couples, families, and small groups year-round.
        </p>
        <div className="w-16 h-px bg-gray-400 mx-auto"></div>
      </section>

      {/* Footer Note */}
      <section className="bg-gray-50 py-12 text-center text-gray-600 text-sm border-t border-gray-200">
        <p>
          Based in Madrid, near Retiro Park. Working painter, MFA in Painting.
        </p>
      </section>
    </div>
  );
};

export default ToursPage;
