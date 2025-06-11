"use client";

import { useEffect, useState } from "react";
import EventEditor from "./components/EventEditor";

const Event = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <EventEditor />
    </div>
  );
};

export default Event;
