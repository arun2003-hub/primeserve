
function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        backgroundColor: "#202124",
        color: "#ffffff",
        padding: "45px 60px 25px 60px",
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Footer Content */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 1fr 1fr 1fr",
          gap: "60px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* PrimeServe */}
        <div>
          <h2
            style={{
              margin: "0 0 15px 0",
              fontSize: "20px",
              color: "#ffffff",
              fontWeight: "600",
            }}
          >
            PRIMESERVE
          </h2>

          <p
            style={{
              margin: "0",
              color: "#b8b8b8",
              fontSize: "13px",
              lineHeight: "1.7",
              maxWidth: "300px",
            }}
          >
            PrimeServe is a platform for managing products,
            APIs, services, and business operations through
            one centralized application.
          </p>
        </div>

        {/* Company */}
        <div>
          <h3
            style={{
              margin: "0 0 18px 0",
              fontSize: "12px",
              color: "#9e9e9e",
              fontWeight: "500",
              letterSpacing: "1px",
            }}
          >
            COMPANY
          </h3>

          <p
            style={{
              margin: "0 0 10px 0",
              fontSize: "13px",
              color: "#ffffff",
            }}
          >
            About PrimeServe
          </p>

          <p
            style={{
              margin: "0 0 10px 0",
              fontSize: "13px",
              color: "#ffffff",
            }}
          >
            Products & APIs
          </p>

          <p
            style={{
              margin: "0 0 10px 0",
              fontSize: "13px",
              color: "#ffffff",
            }}
          >
            API Management
          </p>

          <p
            style={{
              margin: "0",
              fontSize: "13px",
              color: "#ffffff",
            }}
          >
            Analytics & Reports
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3
            style={{
              margin: "0 0 18px 0",
              fontSize: "12px",
              color: "#9e9e9e",
              fontWeight: "500",
              letterSpacing: "1px",
            }}
          >
            CONTACT
          </h3>

          <p
            style={{
              margin: "0 0 10px 0",
              fontSize: "13px",
              color: "#ffffff",
            }}
          >
            Email: support@primeserve.com
          </p>

          <p
            style={{
              margin: "0 0 10px 0",
              fontSize: "13px",
              color: "#ffffff",
            }}
          >
            Phone: +91 98765 43210
          </p>

          <p
            style={{
              margin: "0",
              fontSize: "13px",
              color: "#b8b8b8",
              lineHeight: "1.6",
            }}
          >
            PrimeServe Support Team
          </p>
        </div>

        {/* Office */}
        <div>
          <h3
            style={{
              margin: "0 0 18px 0",
              fontSize: "12px",
              color: "#9e9e9e",
              fontWeight: "500",
              letterSpacing: "1px",
            }}
          >
            OFFICE
          </h3>

          <p
            style={{
              margin: "0",
              fontSize: "13px",
              color: "#ffffff",
              lineHeight: "1.7",
            }}
          >
            PrimeServe Technologies
            <br />
            Business & Technology Center
            <br />
            Tamil Nadu, India
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div
        style={{
          borderTop: "1px solid #3a3a3a",
          marginTop: "35px",
          paddingTop: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1400px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <p
          style={{
            margin: "0",
            color: "#888888",
            fontSize: "12px",
          }}
        >
          © 2026 PrimeServe. All Rights Reserved.
        </p>

        <p
          style={{
            margin: "0",
            color: "#888888",
            fontSize: "12px",
          }}
        >
          Secure • Reliable • Scalable
        </p>
      </div>
    </footer>
  );
}

export default Footer;