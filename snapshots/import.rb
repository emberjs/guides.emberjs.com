require 'rubygems'
require 'couchrest'
require 'yaml'
require 'nokogiri'

def import_page(page, section=nil)
  return
  @db.save_doc({
    :_id      => build_id(section, page['url']),
    :type     => 'guide',
    :version  => VERSION,
    :section  => section,
    :guide    => page['url'],
    :title    => page['title'],
    :language => LANGUAGE,
    :markdown => get_content("#{section}/#{page['url']}"),
  })
  puts "saving #{page.inspect} to couchdb...\n"
end

def extract_content(path, version)
  page = Nokogiri::HTML(File.open(path, "r"))

  if version < "v2.2.0"
    page.css('#content').to_s
  else
    page.at_css('article.chapter').to_s
  end
end

def build_id(language, version, section, guide)
  "guide-#{language}-#{version}-#{section}-#{guide}"
end


# setup the server & database
# @server = CouchRest.new("https://peabornightshoureardeger:6b57d9cb92540282ec631021268b2e4e99de6131@locks.cloudant.com")
@server = CouchRest.new("http://127.0.0.1:5984/")
@db = @server.database!('ember-guides')

LANGUAGE = "en-US"

html_files = Dir.glob('**/*.html');

html_files.each do |file_path|
  next unless file_path.start_with? "v"
  next if file_path.include? "404.html"

  version, section, guide, file = file_path.split("/")

  if file.nil?
    file = "index"
  end

  html = extract_content file_path, version
  # require'pry';binding.pry
puts "v #{version}, s #{section}, g #{guide}"
  @db.save_doc({
    :_id      => "guide-#{LANGUAGE}-#{file_path.gsub('/', '-')}",
    :type     => 'guide',
    :version  => version,
    :section  => section,
    :guide    => guide,
    :title    => section,
    :language => LANGUAGE,
    :html => html,
  })
end
