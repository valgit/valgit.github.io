---
layout: page
title: Open Source Projects
permalink: /projects
---

Some of my OpenSource project 

{% for repo in site.github.public_repositories %}

{% if repo.fork == false and repo.topics.size > 0 %}

## [{{ repo.name }}]({{ repo.html_url }})

{{ repo.description }}

Topics: {{ repo.topics | array_to_sentence_string }}

Last updated: {{ repo.updated_at | date_to_string }}

{% endif %}

{% endfor %}

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/U7U5L8F29)


