---
layout: default
title: Semua Artikel
---

# Semua Artikel

<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {% for post in site.posts %}
    <div class="bg-white rounded-2xl shadow-xl overflow-hidden hover-scale">
        {% if post.image %}
        <img src="{{ site.baseurl }}{{ post.image }}" class="w-full h-48 object-cover">
        {% else %}
        <div class="w-full h-48 bg-gradient-to-r from-red-400 to-yellow-400 flex items-center justify-center">
            <i class="fas fa-newspaper text-white text-4xl"></i>
        </div>
        {% endif %}
        <div class="p-6">
            <h2 class="text-xl font-bold mb-2"><a href="{{ site.baseurl }}{{ post.url }}" class="text-gray-800 hover:text-red-600">{{ post.title }}</a></h2>
            <p class="text-gray-500 text-sm">{{ post.date | date: "%d %b %Y" }}</p>
            <p class="text-gray-600 mt-2">{{ post.excerpt | strip_html | truncatewords:15 }}</p>
            <a href="{{ site.baseurl }}{{ post.url }}" class="inline-block mt-4 text-red-600 font-semibold">Baca →</a>
        </div>
    </div>
    {% endfor %}
</div>
