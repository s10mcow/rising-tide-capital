import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link, useLocation } from "react-router-dom";
import Brand from "./Brand";

const links = [
  { to: "/#our-work", label: "Our work" },
  { to: "/contracting", label: "Contracting" },
  { to: "/#about", label: "Our team" },
  { to: "/closing-process", label: "Closing guide" },
];
export default function Header() {
  const { pathname } = useLocation();
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <Link to="/" className="brand-link" aria-label="Rising Tide home">
          <Brand contracting={pathname.startsWith("/contracting")} />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              aria-current={pathname === to ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link to="/#contact" className="site-button header-contact">
          Let’s talk <span aria-hidden="true">↗</span>
        </Link>
        <button
          className="menu-toggle"
          aria-label="Open navigation menu"
          aria-haspopup="menu"
          aria-expanded={Boolean(anchor)}
          aria-controls={anchor ? "site-mobile-nav" : undefined}
          onClick={(event) => setAnchor(event.currentTarget)}
        >
          <span />
          <span />
        </button>
        <Menu
          id="site-mobile-nav"
          anchorEl={anchor}
          open={Boolean(anchor)}
          onClose={() => setAnchor(null)}
        >
          {[
            { to: "/", label: "Home" },
            ...links,
            { to: "/#contact", label: "Contact" },
          ].map(({ to, label }) => (
            <MenuItem
              key={to}
              component={Link}
              to={to}
              onClick={() => setAnchor(null)}
            >
              {label}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </header>
  );
}
