---
title: Home
layout: default
home: true
---

<div class="sidebar col4 pad1">
<h4 class="uppercase">Get Started</h4>
<ul >
    {% assign posts = site.posts | sort: 'date', 'last' %}
    {% for post in posts  %}
    <li class="p0 keyline-bottom"><a class="pad2 block" href="{{site.baseurl}}{{post.url}}">{{post.title}}</a></li>
    {% endfor %}
</ul>
</div>
<div class="main_col col8" markdown="1">

# Welcome

Welcome to the ENTSO-E base web style guide.

<div class="pad2 fill-red dark strong center">
    Please note this codebase is under development and any component can change at any time. Including the hosted location of the style file. 
    <p>USE WITH CAUTION</p>
</div>

<div class="exhibit">
  <div class="exhibit__content">
    Get started with using ENTSO-E base styles by using the following.
  </div>

  <div class="exhibit__caption">
{% highlight html %}
<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,700italic,400,300,700" />
<link href="https://fonts.googleapis.com/css?family=Lato:700" rel="stylesheet">

<link href='https://docs.entsoe.eu/ee-base/latest/styles/main.css' rel='stylesheet' />
{% endhighlight %}
include main.css in our HTML header.
  </div>
</div>

</div>