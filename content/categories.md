<ul>
    {{ range $key, $value := .Site.Taxonomies.categories }}
    <li>
        <a href="/categories/{{ $key | urlize }}">{{ $key | title }}</a>
    </li>
    {{ end }}
</ul>
