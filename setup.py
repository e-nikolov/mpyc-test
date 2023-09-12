"""MPyC setup script.

Run: "pip install ."
Or:  "pip install -e ."
"""

from setuptools import setup

with open("README.md", "r") as f:
    LONG_DESCRIPTION = f.read()

setup(
    name="mpyc-web",
    version="0.9.4",
    author="Berry Schoenmakers",
    author_email="berry@win.tue.nl",
    url="https://github.com/lschoe/mpyc",
    description="MPyC for Multiparty Computation in Python",
    long_description=LONG_DESCRIPTION,
    long_description_content_type="text/markdown",
    keywords=[
        "crypto",
        "cryptography",
        "multiparty computation",
        "MPC",
        "secret sharing",
        "Shamir threshold scheme",
        "pseudorandom secret sharing",
        "PRSS",
    ],
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Environment :: Console",
        "Framework :: AsyncIO",
        "Framework :: Jupyter",
        "Intended Audience :: Developers",
        "Intended Audience :: Education",
        "Intended Audience :: Information Technology",
        "Intended Audience :: Science/Research",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
        "Programming Language :: Python :: 3 :: Only",
        "Topic :: Security :: Cryptography",
        "Topic :: Software Development :: Libraries :: Application Frameworks",
        "Topic :: Software Development :: Libraries :: Python Modules",
        "Topic :: System :: Distributed Computing",
    ],
    license='MIT License',
    packages=["mpyc-web"],
    platforms=["any"],
    python_requires=">=3.9",
)
