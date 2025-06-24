const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm py-6 mt-16">
      <div className="container mx-auto px-4 text-center">
        <p>
          &copy; {new Date().getFullYear()} SubtTracker. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
