module GithubPagesHamlHelper
  # require 'haml'
  # require 'haml/exec'

  # Github Pages don't support Haml plugins, so have to run Html2Haml locally and commit the results
  class Generator < Jekyll::Generator
    def generate(site)

      source = parse_source(site)
      destination = site.config["source"]

      Dir.glob(File.join(source, '*.haml')).each do |source_file|
        destination_file = source_file.sub(source, destination).sub(/\.haml$/i, '.html')

        if older?(destination_file, source_file)
          log 'skipped ' + destination_file
          next
        end

        # this will stop current process
        # opts = Haml::Exec::Haml.new([source_file, destination_file])
        # opts.parse!
        log `haml #{source_file} #{destination_file}`
        log "#{source_file} -->> #{destination_file}"
      end

    end

    def parse_source(site)
      plugin_config = site.config["haml4gh"]
      File.join(site.config["source"], (plugin_config && plugin_config["source"] || "_source"))
    end

    def older?(destination_file, source_file)
      File.exists?(destination_file) && (File.mtime(destination_file) >= File.mtime(source_file))
    end

    def log(msg)
      print "\nhaml4gh: #{msg}" unless msg.empty?
    end
  end
end
