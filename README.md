# The Polyglot Jupyter Kernel
<img width="1519" alt="Screenshot 2019-07-30 at 15 41 43" src="https://user-images.githubusercontent.com/9486619/62134314-8d076000-b2e0-11e9-950e-b773f41ac085.png">


The Polyglot Jupyter Kernel is a [kernel for Jupyter notebooks](https://jupyter.readthedocs.io/en/latest/projects/kernels.html) that can handle multiple programming languages. It's running on [GraaLVM](https://www.graalvm.org/).

### Installing

Install the dependencies (make sure to use python 2.7 during `npm i`) and then install the kernel.

```
npm install . -g --python=python2.7 && ijsinstall --spec-path=full
```

### Using different programming languages

A different language can be used in each notebook cell. Simply specify the desired language as a [magic command](https://ipython.readthedocs.io/en/stable/interactive/magics.html) in the first line of the cell:

```ruby
%polyglot [language code]

[code]
```

for example:

```ruby
%polyglot python

my_dict = dict()
```

### Inspecting Polyglot variables

The Polyglot Jupyter Kernel shares all available global variables across all notebook cells. It provides an inspector extension to the Jupyter notebook frontend that lists all polyglot variables available.

To install the extension, the directory containing the extension's code has to be moved to your local Jupyter installation, like so:

```
cd pp19-3-jupyter-kernel && cp -r /anaconda3/lib/python3.7/site-packages/jupyter_contrib_nbextensions/nbextensions/varInspector .
```
