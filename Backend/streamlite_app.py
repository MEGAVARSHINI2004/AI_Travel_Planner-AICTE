import streamlit as st
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

st.set_page_config(page_title="AI Travel Planner", layout="centered")

st.title("🎒 AI Travel Planner for Students")

destination = st.text_input("Destination")
days = st.number_input("Number of days", min_value=1, step=1)
budget = st.number_input("Budget", min_value=1000, step=500)
interests = st.text_input("Interests (food, culture, adventure)")

if st.button("Generate Itinerary"):
    if not destination or not interests:
        st.error("Please fill all fields")
    else:
        with st.spinner("Generating itinerary..."):
            prompt = f"""
            Create a {days}-day budget travel itinerary for {destination}.
            Budget: {budget}
            Interests: {interests}
            """

            model = genai.GenerativeModel("gemini-pro")
            response = model.generate_content(prompt)

            st.success("Itinerary Generated!")
            st.write(response.text)
