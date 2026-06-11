# Product Requirements Document (PRD)

# Thesis7

**Version:** 1.0
**Project Type:** Music School + Musical Instrument Shop + Band Booking Platform
**Business Name:** Thesis7
**Location:** Gouripur Bazar, Ali Tower, Daudkandi, Cumilla, Bangladesh, 3519
**Contact:** 01889-581811

---

# 1. Executive Summary

Thesis7 is a modern music-focused platform that combines:

1. Music Learning Services (Guitar and future instruments)
2. Musical Instrument Store
3. Professional Band & Musician Services
4. Concert/Event Booking Services

The platform will allow users to:

* Learn guitar through structured courses
* Claim a free introductory class
* Book musicians or bands for events
* Purchase musical instruments online
* Contact Thesis7 directly
* Manage bookings and purchases through a personal account

The system will use:

* Frontend: Next.js
* Backend: Node.js / Next.js API Routes
* Database: MongoDB
* Authentication: User Authentication System
* Admin Dashboard: Full management panel

---

# 2. Business Goals

## Primary Goals

* Increase student enrollment
* Sell musical instruments online
* Generate event booking leads
* Build Thesis7 brand presence
* Manage all services from one platform

## Success Metrics

* Number of Free Class Registrations
* Guitar Course Enrollments
* Instrument Sales
* Concert Bookings
* Monthly Active Users
* Revenue Growth

---

# 3. Target Users

## Student

Wants to:

* Learn guitar
* Join music classes
* Attend free trial class

## Music Enthusiast

Wants to:

* Buy instruments
* Explore products
* Learn music

## Event Organizer

Wants to:

* Hire a band
* Book musicians
* Request performances

## Admin

Wants to:

* Manage students
* Manage products
* Manage bookings
* Track sales

---

# 4. User Roles

## Guest

Can:

* View website
* Browse products
* View band services
* Register account
* Request free class

Cannot:

* Place orders
* Manage bookings

---

## Registered User

Can:

* Login
* Update profile
* Book free class
* Buy instruments
* Book band services
* View order history
* View booking history

---

## Admin

Can:

* Manage users
* Manage products
* Manage categories
* Manage orders
* Manage classes
* Manage event bookings
* Manage website content

---

# 5. Core Features

## A. Authentication System

### Registration

Fields:

* Full Name
* Email
* Phone Number
* Password

### Login

Options:

* Email + Password
* Google Login (Future)

### Features

* JWT Authentication
* Password Reset
* Profile Management

---

## B. Home Page

### Hero Section

Headline:

"Learn Music, Join the Band, Own the Sound"

CTA Buttons:

* Free Trial Class
* Shop Instruments
* Book Our Band

### Sections

* About Thesis7
* Featured Instruments
* Music Courses
* Band Services
* Testimonials
* Contact Information

---

## C. Free Trial Class

Special feature:

Every visitor can register for:

"1 Free Guitar Class"

Form:

* Name
* Phone
* Email
* Age
* Preferred Schedule

Admin receives registration request.

---

## D. Music Learning Module

### Courses

Initially:

* Beginner Guitar
* Intermediate Guitar
* Advanced Guitar

Course Information:

* Description
* Duration
* Fee
* Instructor
* Schedule

Student can:

* Enroll
* Submit inquiries

---

## E. Musical Instrument Shop

### Categories

* Acoustic Guitar
* Electric Guitar
* Bass Guitar
* Ukulele
* Keyboard
* Drum
* Accessories
* Amplifiers

### Product Details

* Product Name
* Description
* Images
* Price
* Stock
* Brand

### Shopping Features

* Search
* Filter
* Wishlist
* Cart
* Checkout

---

## F. Order Management

User can:

* Place Orders
* View Orders
* Track Status

Order Status:

* Pending
* Confirmed
* Processing
* Shipped
* Delivered
* Cancelled

---

## G. Band Booking System

Users can hire Thesis7 band for:

* Wedding
* Corporate Event
* Birthday Party
* Cultural Program
* College Event
* Concert
* Private Event

### Booking Form

Fields:

* Name
* Phone
* Email
* Event Type
* Event Date
* Location
* Budget
* Notes

Status:

* Pending
* Contacted
* Confirmed
* Completed

---

## H. Gallery

Showcase:

* Concert Photos
* Event Photos
* Student Performances
* Studio Sessions

---

## I. Testimonials

Display:

* Student Reviews
* Event Client Reviews
* Customer Reviews

---

## J. Contact Page

Display:

Business Name:
Thesis7

Location:
Gouripur Bazar, Ali Tower, Daudkandi, Cumilla, Bangladesh, 3519

Phone:
01889-581811

Features:

* Contact Form
* Google Map
* Social Media Links

---

# 6. Admin Dashboard

## Dashboard Overview

Statistics:

* Total Users
* Total Students
* Total Products
* Total Orders
* Total Bookings
* Revenue

---

## Product Management

Admin can:

* Create Product
* Edit Product
* Delete Product
* Manage Inventory

---

## Course Management

Admin can:

* Create Course
* Update Course
* Manage Enrollments

---

## Booking Management

Admin can:

* Approve Requests
* Reject Requests
* Contact Customers

---

## User Management

Admin can:

* View Users
* Suspend Users
* Change Roles

---

## Website CMS

Admin can update:

* Homepage
* Gallery
* Testimonials
* Contact Information

---

# 7. Database Design (MongoDB)

## Collections

### users

* _id
* name
* email
* phone
* password
* role
* createdAt

### products

* _id
* title
* description
* category
* images
* price
* stock
* createdAt

### orders

* _id
* userId
* products
* total
* status
* paymentStatus

### courses

* _id
* title
* description
* fee
* schedule

### enrollments

* _id
* userId
* courseId

### freeClasses

* _id
* name
* phone
* email
* age

### bandBookings

* _id
* customerName
* eventType
* eventDate
* location
* budget
* status

### testimonials

* _id
* user
* review
* rating

---

# 8. Technical Stack

Frontend:

* Next.js 15
* TypeScript
* Tailwind CSS
* Shadcn UI

Backend:

* Next.js Server Actions
* Node.js

Database:

* MongoDB Atlas

Authentication:

* NextAuth/Auth.js

State Management:

* Zustand

Forms:

* React Hook Form
* Zod

Storage:

* Cloudinary

Deployment:

* Vercel

---

# 9. Future Enhancements

### Phase 2

* Online Course Videos
* Student Dashboard
* Attendance Tracking
* Payment Gateway Integration
* Instructor Panel

### Phase 3

* Mobile App
* Live Online Classes
* Event Ticket Selling
* Band Member Profiles
* Instrument Rental System

---

# 10. Launch MVP Scope

Must Have:

✓ User Authentication
✓ Free Trial Class Registration
✓ Guitar Course Listing
✓ Instrument Shop
✓ Product Management
✓ Band Booking System
✓ Contact System
✓ Admin Dashboard
✓ MongoDB Integration
✓ Responsive Design

Target Launch:
Version 1.0 MVP
