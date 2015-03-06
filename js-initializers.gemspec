# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'js-initializers/version'

Gem::Specification.new do |spec|
  spec.name          = 'js-initializers'
  spec.version       = JsInitializers::VERSION
  spec.authors       = ['Nahuel Cuesta Luengo']
  spec.email         = ['nahuelcuestaluengo@gmail.com']
  spec.summary       = %q{Avoid JS mayhem on your Rails app! js-initializers is an engine that adds a micro-framework for initializing and organizing client-side logic in a modular way}
  spec.description   = %q{Avoid JS mayhem on your Rails app! js-initializers is an engine that adds a micro-framework for initializing and organizing client-side logic in a modular way}
 
  spec.homepage      = 'https://github.com/ncuesta/js-initializers'
  spec.license       = 'MIT'

  spec.files         = `git ls-files -z`.split('\x0')
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ['lib']

  spec.add_development_dependency 'bundler', '~> 1.7'
  spec.add_development_dependency 'rake', '~> 10.0'
  spec.add_dependency 'rails', '> 3.1'
end
